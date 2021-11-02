const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({error: 'Data is not valid'});
    }

    const userData = {
        username: req.body.username,
        password: req.body.password,
    };

    const user = new User(userData);

    try {
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;