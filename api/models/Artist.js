const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    info: String
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;