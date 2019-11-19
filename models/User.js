const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 150
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    creation: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);