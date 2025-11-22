
const prisma = require('../prismaClient');

const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            skip: skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });

        const totalPosts = await prisma.post.count({ where: { published: true } });

        res.status(200).json({
            data: posts,
            meta: {
                totalPosts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit)
            }
        });
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getParticularPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createPost = async (req, res) => {
    const { title, content, published } = req.body;
    try {
        // Validation is handled by middleware now
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published: published || false,
                authorId: req.user.userId
            }
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCommentsForPost = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(id) },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addCommentToPost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(id),
                authorId: req.user.userId
            }
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment to post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCommentById = async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const comment = await prisma.comment.findFirst({
            where: {
                id: parseInt(commentId),
                postId: parseInt(id)
            },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    try {
        const existingPost = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization Check
        if (existingPost.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                published
            }
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const existingPost = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Authorization Check
        if (existingPost.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateComment = async (req, res) => {
    const { id, commentId } = req.params;
    const { content } = req.body;
    try {
        const existingComment = await prisma.comment.findFirst({
            where: {
                id: parseInt(commentId),
                postId: parseInt(id)
            }
        });
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Authorization Check
        if (existingComment.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { content }
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const existingComment = await prisma.comment.findFirst({
            where: {
                id: parseInt(commentId),
                postId: parseInt(id)
            }
        });
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Authorization Check
        if (existingComment.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await prisma.comment.delete({
            where: { id: parseInt(commentId) }
        });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllPosts, getParticularPost, createPost, getCommentsForPost, addCommentToPost, getCommentById, updatePost, deletePost, updateComment, deleteComment };