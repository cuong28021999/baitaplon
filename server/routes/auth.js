const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // VALIDATE DATA
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist!');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        permission: req.body.permission
    });

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser.name);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // VALIDATE DATA
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found!');

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET);
    res.header('token', token);
    return res.status(200).send(user.name);
});


module.exports = router;