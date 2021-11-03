const express = require('express');

const User = require('../models/User');
const TrackHistory = require("../models/TrackHistory");

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    let user;

    try {
        user = await User.findOne({token});
    } catch (e) {
        return res.status(500).send(e);
    }

    if (!user) {
        return res.status(401).send({error: 'Wrong token'});
    }

    if (!req.body.track) {
        return res.status(400).send('Data is not valid');
    }

    const trackHistoryData = {
        track: req.body.track,
        user: user._id,
    };

    const trackHistory = new TrackHistory(trackHistoryData);

    try {
        await trackHistory.generateDatetime();
        await trackHistory.save();
        res.send(trackHistory);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;