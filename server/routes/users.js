const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';

        const users = await User.find({
            username: { $regex: searchQuery, $options: 'i' }
        }).select('_id username');

        console.log(`User search results: ${users}`);

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users', error});
    }
});

module.exports = router;