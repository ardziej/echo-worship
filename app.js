const config = require('./modules/config/config')

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const song = require('./modules/songs/songs')
const axios = require('axios');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser('cookie-key'));
app.use(session({
    cookie: {maxAge: 3600 * 24},
    secret: 'echo-id-worship-key-77',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));

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
app.use(express.static(__dirname + '/public')); // Set the static files location

app.get('/', function (req, res) {
    res.render('ui', {
        title: "Worship",
        url: publicUrl,
        socketIO: config.ws().publicUrl,
        message: 'Hello there!',
        sequence: song.getSequence()
    })
})

app.get('/login', function (req, res) {
    if (req.session.role === 'admin') {
        res.redirect('/')
    } else {
        res.locals.message = req.flash()
        res.render('login', {
            title: "Logowanie",
            url: publicUrl
        })
    }
})

app.post('/login', function (req, res) {

    axios.post('http://id.weareecho.localhost/api/v1/login', {
        email: req.body.email,
        password: req.body.password
    })
        .then(function (response) {
            req.session.email = req.body.email;
            req.session.role = 'admin'
            req.session.token = response.data.access_token;
            res.redirect('/');
        })
        .catch(function (error) {
            req.flash('error', 'Błędne dane.');
            res.redirect('/login');
        });
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
    res.render('display', {
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
