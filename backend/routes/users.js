const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const router = express.Router();

// Fetching users from RandomUser API and storing in database
router.post('/fetch', async (req, res) => {
    try {
        let usersInserted = 0;
        const totalUsersNeeded = 1000;
        const usersPerPage = 20;
        const totalPages = Math.ceil(totalUsersNeeded / usersPerPage);

        for (let page = 1; page <= totalPages; page++) {
            const response = await axios.get(`https://randomuser.me/api/?results=${usersPerPage}&page=${page}`);
            const users = response.data.results;

            for (const user of users) {
                if (usersInserted >= totalUsersNeeded) break;

                const userData = {
                    uuid: user.login.uuid,
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    city: user.location.city
                };

                try {
                    await User.create(userData);
                    usersInserted++;
                } catch (error) {
                    // This part skip duplicate entries
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }
            console.log(`Fetched page ${page}, total users inserted: ${usersInserted}`);
        }

        res.json({
            message: `Successfully fetched and stored ${usersInserted} users`,
            total: usersInserted
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update user/ Edit user
router.put('/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { name, email, city } = req.body;

        if (!name || !email || !city) {
            return res.status(400).json({ error: 'Name, email, and city are required' });
        }

        const user = await User.findByUuid(uuid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.update(uuid, { name, email, city });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

module.exports = router;