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

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.album) {
        return res.status(400).send('Data is not valid');
    }

    const trackData = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration || null,
    };

    const track = new Track(trackData);

    try {
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;