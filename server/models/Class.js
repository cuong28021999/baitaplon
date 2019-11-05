const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    code: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    userid: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    students: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Class', classSchema, 'classes');