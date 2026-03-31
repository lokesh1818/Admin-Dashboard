const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
});


router.post('/', async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});


router.delete('/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});


router.post('/google-login', async(req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                role: 'admin',
                status: 'active'
            });
            await user.save();
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;