const express = require('express');

const Track = require("../models/Track");
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.album) {
            query.album = req.query.album;
        }

        let tracks = [];

        if (req.query.artist) {
            query.artist = req.query.artist;
            const albums = await Album.find(query).populate('artist', 'title');

            await Promise.all(albums.map(async album => {
                const albumTracks = await Track.find({album: album._id}).populate('album', 'title');

                if (albumTracks.length > 0) {
                    tracks = [...tracks, ...albumTracks];
                }
            }));

            return res.send(tracks);
        }

        tracks = await Track.find(query).populate('album', 'title');
        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;