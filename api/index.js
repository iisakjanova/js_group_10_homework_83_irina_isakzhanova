const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');

const albums = require('./app/albums');
const artists = require('./app/artists');
const tracks = require('./app/tracks');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/albums', albums);
app.use('/artists', artists);
app.use('/tracks', tracks);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        console.log('Exiting');
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));