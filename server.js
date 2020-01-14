const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./config')
const port = 8080
const app = express()
const cors = require('cors')
const secret = 'secret'
const jwt = require('jsonwebtoken')

const userData = {
    email: 'amusant@test.com',
    password: 'azerty'
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/home', function(req, res) {
    res.send('Welcome!')
})
app.get('/api/secret', function(req, res) {
    res.send('The password is potato')
})

app.post('/api/home', function(req, res) {
    const formData = req.body
    const payload = {
        sub: req.body.email
    }
    if (userData.password !== formData.password) {
        res.send('Mauvais password')
    } else {
        jwt.sign(payload, secret, (err, token) => {
            res.json({
                token
            })
        })
    }
})

app.listen(port, err => {
    if (err) {
        throw new Error('Something bad happened...')
    }

    console.log(`Server is listening on ${port}`)
})
