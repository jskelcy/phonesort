var socket = io.connect('/');

socket.on('position', function(data){
	console.log(data.msg);
})

socket.on('joinStatus', function(data){
	switch(data.msg){
		case(0):
			alert('Invalid Room, sorry man');
			break;
		case(1):
			$('#master').append('<p>You are now the master of room ' + data.room.roomId + '</p>')
			break;
		case(2):
			socket.id = data.socketId
	}
})

socket.on('soundRally',function(data){
	console.log(socket.id)
	T("sin", {freq:data[socket.id], mul:0.5, timeout: 1000}).play();
});