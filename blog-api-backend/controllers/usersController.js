const getAllUsers = (req, res) => {
    const fakeUsers = [
        {
            id: 1,
            username: "Ukashatu40",
            email: "ukasha@gmail.com",
            role: "admin",
            date: Date.now()
        },
        {
            id: 2,
            username: "JaneDoe",
            email: "john@gmail.com",
            role: "user",
            date: Date.now()
        }
    ];

    res.status(200).json(fakeUsers);
}

module.exports = { getAllUsers };