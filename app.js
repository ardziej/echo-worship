const config = require('./modules/config/config')

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const song = require('./modules/songs/songs')

let sequence = require('./s3/db/sequence')
// 192.68.77.210 = asus M1

if (app.get('env') === 'development') {
    app.locals.pretty = true
}
let url = '//' + config.node().ip + ":" + config.node().port
let publicUrl = '//' + config.node().publicUrl

server.listen(config.node().port, () => console.log('ECHO Worship listening on: ' + url))

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use('/media', express.static('s3/media'))

//console.log(song.getSequence())

app.get('/', function (req, res) {
    res.render('ui', {
        title: "V2",
        url: publicUrl,
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/display', function (req, res) {
    res.render('display', {
        title: "DISPLAY",
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/master', function (req, res) {
    res.render('master', {
        title: "MASTER",
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/prompter', function (req, res) {
    res.render('prompter', {
        title: "PROMPTER",
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/training', function (req, res) {
    res.render('training', {
        title: "TRAINING",
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/spotify', function (req, res) {
    res.render('spotify', {
        title: "SPOTIFY",
        socketIO: config.ws().ip + ":" + config.ws().port,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/m', function (req, res) {
    res.redirect('/master')
})
app.get('/d', function (req, res) {
    res.redirect('/display')
})
app.get('/p', function (req, res) {
    res.redirect('/prompter')
})

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'})
    socket.on('my other event', function (data) {
        console.log(data)
    })
})
