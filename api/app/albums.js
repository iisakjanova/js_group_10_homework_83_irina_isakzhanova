const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const Album = require('../models/Album');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.artist) {
           query.artist = req.query.artist;
        }

        const albums = await Album.find(query).populate('artist', 'title');
        res.send(albums);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist', 'title image info');

        if (album) {
            res.send(album);
        } else {
            res.status(404).send({error: 'Album is not found'});
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.artist) {
        return res.status(400).send('Data is not valid');
    }

    const albumData = {
        title: req.body.title,
        artist: req.body.artist
    };

    if (req.body.year) {
        albumData.year = req.body.year;
    }

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);

    try {
        await album.save();
        res.send(album);
    } catch (e) {
        if (e.message.includes('duplicate key error')) {
            res.status(400).send('Duplicate key');
        }

        res.status(400).send(e);
    }
});

module.exports = router;