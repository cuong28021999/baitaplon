const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.header('token');

    if (!token) res.status(401).send('No token provided');
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid token!');
    }
} 