const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const _id = req.user._id;

    try {
        const user = await User.findOne({ _id: _id });
        req.permission = user.permission;
        next();
    } catch (err) {
        res.status(400).send(err);
    }
}