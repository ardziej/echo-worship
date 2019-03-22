const router = require('express').Router();
const config = require('./modules/config/config')
const song = require('./modules/songs/songs')
let publicUrl = '//' + config.node().publicUrl

router.get('/login', function (req, res) {
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

router.post('/login', function (req, res) {

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


// authAdmin,
router.get('/', function (req, res) {
  res.render('dashboard', {
    title: "Dashboard",
    url: publicUrl,
    socketIO: config.ws().publicUrl,
    sequence: song.getSequence()
  })
})

router.get('/display', function (req, res) {
  res.render('display', {
    title: "DISPLAY",
    socketIO: config.ws().publicUrl,
    message: 'Hello there!',
    sequence: song.getSequence()
  })
})

router.get('/master', function (req, res) {
  res.render('master', {
    title: "MASTER",
    socketIO: config.ws().publicUrl,
    message: 'Hello there!',
    sequence: song.getSequence()
  })
})

router.get('/prompter', function (req, res) {
  res.render('prompter', {
    title: "PROMPTER",
    socketIO: config.ws().publicUrl,
    message: 'Hello there!',
    sequence: song.getSequence()
  })
})

router.get('/training', function (req, res) {
  res.render('training', {
    title: "TRAINING",
    socketIO: config.ws().publicUrl,
    message: 'Hello there!',
    sequence: song.getSequence()
  })
})

router.get('/spotify', function (req, res) {
  res.render('spotify', {
    title: "SPOTIFY",
    socketIO: config.ws().ip + ":" + config.ws().port,
    message: 'Hello there!',
    sequence: song.getSequence()
  })
})

router.get('/m', function (req, res) {
  res.redirect('/master')
})
router.get('/d', function (req, res) {
  res.redirect('/display')
})
router.get('/p', function (req, res) {
  res.redirect('/prompter')
})

module.exports = router;
