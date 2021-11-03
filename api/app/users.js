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
        return res.sendStatus(500);
    }
});

router.post('/sessions', async (req, res) => {
    let user;

    try {
        user = await User.findOne({username: req.body.username});
    } catch (e) {
        return res.status(500).send(e);
    }

    if (!user) {
        return res.status(401).send({error: 'User is not found'});
    }

    let isMatch;

    try {
        isMatch = await user.checkPassword(req.body.password);
    } catch (e) {
        return res.status(500).send(e);
    }

    if (!isMatch) {
        return res.status(401).send({error: 'Password is wrong'});
    }

    try {
        user.generateToken();
        await user.save();
        res.send({token: user.token});
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;