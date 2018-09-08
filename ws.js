const config = require('./modules/config/config')

let http = require('http')
let express = require('express')
let fs = require('fs')
let io = require('socket.io')
let crypto = require('crypto')

let app = express()
let server = http.createServer(app)

io = io(server)


io.on('connection', function (socket) {
    socket.on('multiplex-statechanged', function (data) {
        if (typeof data.secret === 'undefined' || data.secret == null || data.secret === '') return
        if (createHash(data.secret) === data.socketId) {
            data.secret = null
            socket.broadcast.emit(data.socketId, data)
        }
    })
    socket.on('echo', function (data) {
        socket.broadcast.emit('echo', data)
    })
})

app.get("/token", function (req, res) {
    let ts = new Date().getTime()
    let rand = Math.floor(Math.random() * 9999999)
    let secret = ts.toString() + rand.toString()
    res.send({secret: secret, socketId: createHash(secret)})
})

let createHash = function (secret) {
    let cipher = crypto.createCipher('blowfish', secret)
    return (cipher.final('hex'))
}

// Actually listen
server.listen(config.ws().port || null)

let brown = '\033[33m',
    green = '\033[32m',
    reset = '\033[0m'

console.log(brown + "ECHO Worship" + reset + " Socket.io running on: ws://" + green + config.ws().url + reset)