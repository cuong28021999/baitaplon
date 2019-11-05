const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log('Connected to DB!'))

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.options('*', cors())

// import routes
const authRoute = require('./routes/auth')
const yourClassRoute = require('./routes/yourClass')
const examRoute = require('./routes/exam')

// import middlewares
const verifyToken = require('./middlewares/verifyToken')
const checkPermission = require('./middlewares/checkPermission')

app.use('/auth', authRoute)
app.use('/class', yourClassRoute)
app.use('/exam', verifyToken, checkPermission, examRoute)
app.get('/checktoken', verifyToken, (req, res) => res.sendStatus(200))
app.get('/permission', verifyToken, checkPermission, (req, res) => res.status(200).send(req.permission))
app.get('/getuserid', verifyToken, (req, res) => res.status(200).send(req.user._id))


app.listen(port, () => console.log('Server start on port', port))