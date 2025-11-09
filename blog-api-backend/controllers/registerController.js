const registerUser = (req, res) => {
    const { username, password } = req.body;

    // Here you would typically add logic to save the user to a database
    // For this example, we'll just return a success message

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Simulate user registration
    res.status(201).json({ message: 'User registered successfully', user: { username } });
}

module.exports = { registerUser };