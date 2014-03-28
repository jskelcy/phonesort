var express = require('express')
    , app = express()
    , socketHandlers = require('./socketHandlers')
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , device = require('express-device')


server.listen(4020);


app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.urlencoded());
app.use(express.json());
app.use(device.capture());
app.use(express.static( __dirname+'/static'));
app.use(express.static( __dirname+'/public'));


app.get('/',function(req, res){
	console.log('a device of type ' + req.device.type + ' has connected your site');
	if(req.device.type === 'desktop'){
		res.render('index')
	}else{
		res.render('mobileIndex');
	}
});

io.sockets.on('connection', socketHandlers(io));
