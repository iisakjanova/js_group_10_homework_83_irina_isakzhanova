const mongoose = require('mongoose');
const idvalidator = require("mongoose-id-validator");

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: String
});

TrackSchema.plugin(idvalidator);
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;