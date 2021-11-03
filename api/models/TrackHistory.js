const mongoose = require('mongoose');
const idvalidator = require("mongoose-id-validator");

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    datetime: Date,
});

TrackHistorySchema.methods.generateDatetime = function () {
    this.datetime = new Date();
};

TrackHistorySchema.plugin(idvalidator);
const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;