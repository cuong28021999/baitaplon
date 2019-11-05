const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    start: {
        type: Date,
        required: true
    },
    limit: {
        type: Number,
        required: true,
        min: 0
    },
    classId: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

ExamSchema.set("timestamps", true);

module.exports = mongoose.model('Exam', ExamSchema, 'exams')