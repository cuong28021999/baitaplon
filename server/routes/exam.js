const route = require('express').Router();
const Exam = require('../models/Exam')
const {examValidation } = require('../validation')

// get all exam of class
route.get('/', async (req, res) => {
    const classId = req.header('classId')

    try {
        const exams = await Exam.find({ classId: classId})
        if (exams.length == 0) return res.status(400).send('Exam not found!')
        else return res.status(200).send(exams)
    } catch(err) {
        return res.status(400).send('Invalid class ID')
    }
    
})


// create exam
route.post('/', async (req, res) => {
    const {error} = examValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const exam = new Exam({
        name: req.body.name,
        start: req.body.start,
        classId: req.body.classId,
        limit: req.body.limit
    })

    try {
        const savedExam = await exam.save()
        res.status(200).send(savedExam._id)
    } catch(err) {
        res.status(400).send(err)
    }
})

route.delete('/:examId', async (req, res) => {
    const examId = req.params.examId
    try {
        await Exam.deleteOne({ _id: examId })
        res.status(200).send('Delete success!')
    } catch(err) {
        res.status(400).send('Delete failed!')
    }
    
})

module.exports = route