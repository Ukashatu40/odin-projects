module.exports = (req, res) => {
    const user = req.user;
    res.send(`Welcome to the Blog API, ${user.name}!`);
}