const router = require('express').Router();
const Class = require('../models/Class');
const shortId = require('shortid');
const { classValidation } = require('../validation');
const verifyToken = require('../middlewares/verifyToken');

// get class with id
router.get('/', verifyToken, async (req, res) => {
    const userid = req.user._id

    const classes = await Class.find({ userid: userid });

    if (!classes) return res.status(400).send('Class is not found');
    
    res.status(200).send(classes)
});


// create class
router.post('/', verifyToken, async (req, res) => {
    // validate data
    const {error} = classValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // create class code
    req.body.code = shortId.generate();

    // create new class
    const newClass = new Class({
        name: req.body.name,
        code: req.body.code,
        userid: req.user._id
    })

    try {
        const savedClass = await newClass.save();
        res.status(200).send(savedClass.code);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;