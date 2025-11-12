const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {

    try{
        const posts = await prisma.post.findMany({});
        res.status(200).json(posts);
    }
    catch(error){
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}
const getParticularPost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await prisma.post.findUnique({
            where: {id: parseInt(id)}
        });
        if (!post){
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json(post);
    }
    catch(error){
        console.error('Error fetching post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}
const createPost = async (req, res) => {
    const {title, content} = req.body;
    try{
        if (!title || !content){
            return res.status(400).json({message: 'Title and content are required'});
        }
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.user.id
            }
        });
        res.status(201).json(newPost);
    }
    catch(error){
        console.error('Error creating post:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = { getAllPosts, getParticularPost, createPost };