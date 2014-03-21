var socket = io.connect('/');


socket.on('position', function(data){
	console.log(data.msg);
})