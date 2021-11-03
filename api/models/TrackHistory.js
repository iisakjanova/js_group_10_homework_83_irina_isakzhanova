const mongoose = require('mongoose');
const idvalidator = require("mongoose-id-validator");

const TrackHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    track_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    datetime: Date,
});

TrackHistorySchema.plugin(idvalidator);
const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;