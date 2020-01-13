const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const connection = require('./config')
const port = 8080
const app = express()
const cors = require('cors')

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
    if (userData.password !== formData.password) {
        res.send('Mauvais password')
    } else {
        res.send('ok')
    }
})

app.listen(port, err => {
    if (err) {
        throw new Error('Something bad happened...')
    }

    console.log(`Server is listening on ${port}`)
})
