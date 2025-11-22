const prisma = require('../prismaClient');

const getAllUsers = async (req, res) => {
    const fakeUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    res.status(200).json(fakeUsers);
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getPostsByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await prisma.post.findMany({
            where: { authorId: parseInt(id) }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts for user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getPostByUserById = async (req, res) => {
    const { id, postId } = req.params;
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: parseInt(postId),
                authorId: parseInt(id)
            }
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found for this user' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post for user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    // Implementation for deleting a user
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    // Implementation for updating a user
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email }
        });
        res.status(200).json({ message: 'User updated successfully', user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllUsers, getUserById, getPostsByUser, getPostByUserById, deleteUser, updateUser };