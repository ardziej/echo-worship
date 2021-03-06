let http        = require('http');
let express		= require('express');
let fs			= require('fs');
let io			= require('socket.io');
let crypto		= require('crypto');

let app       	= express();
let staticDir 	= express.static;
let server    	= http.createServer(app);

io = io(server);

let opts = {
	port: process.env.PORT || 1948,
	baseDir : __dirname + '/../../'
};

io.on( 'connection', function( socket ) {
	socket.on('multiplex-statechanged', function(data) {
		if (typeof data.secret == 'undefined' || data.secret == null || data.secret === '') return;
		if (createHash(data.secret) === data.socketId) {
			data.secret = null;
			socket.broadcast.emit(data.socketId, data);
		};
	});
});

[ 'css', 'js', 'plugin', 'lib' ].forEach(function(dir) {
	app.use('/' + dir, staticDir(opts.baseDir + dir));
});

app.get("/", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	let stream = fs.createReadStream(opts.baseDir + '/index.html');
	stream.on('error', function( error ) {
		res.write('<style>body{font-family: sans-serif;}</style><h2>reveal.js multiplex server.</h2><a href="/token">Generate token</a>');
		res.end();
	});
	stream.on('readable', function() {
		stream.pipe(res);
	});
});

app.get("/token", function(req,res) {
	let ts = new Date().getTime();
	let rand = Math.floor(Math.random()*9999999);
	let secret = ts.toString() + rand.toString();
	res.send({secret: secret, socketId: createHash(secret)});
});

let createHash = function(secret) {
	let cipher = crypto.createCipher('blowfish', secret);
	return(cipher.final('hex'));
};

// Actually listen
server.listen( opts.port || null );

let brown = '\033[33m',
	green = '\033[32m',
	reset = '\033[0m';

console.log( brown + "reveal.js:" + reset + " Multiplex running on port " + green + opts.port + reset );