const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

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

module.exports = { getAllUsers };