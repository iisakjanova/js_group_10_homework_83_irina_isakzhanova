const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    year: Number,
    image: String,
    info: String
});

AlbumSchema.plugin(idvalidator);
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;