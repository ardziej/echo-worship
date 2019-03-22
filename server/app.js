const config = require('./modules/config/config')

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const song = require('./modules/songs/songs')
const axios = require('axios');
const bodyParser = require('body-parser')
const authAdmin = require('./middleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');

app.use(cookieParser('cookie-key'));
app.use(session({
  cookie: {maxAge: 3600 * 24},
  secret: 'echo-id-worship-key-77',
  resave: false,
  saveUninitialized: false
}))
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));

let sequence = require('../s3/db/sequence')
// 192.68.77.210 = asus M1

if (app.get('env') === 'development') {
  app.locals.pretty = true
}
let url = '//' + config.node().ip + ":" + config.node().port
let publicUrl = '//' + config.node().publicUrl

server.listen(config.node().port, () => console.log('ECHO Worship listening on: ' + url))

app.set('view engine', 'pug')
app.set('views', 'app/views');
app.use('/static', express.static('app/public'))
app.use('/media', express.static('s3/media'))
app.use(express.static('app/public')); // Set the static files location

app.use(routes);

io.on('connection', function (socket) {
  socket.emit('news', {hello: 'world'})
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
