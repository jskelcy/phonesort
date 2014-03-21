var join = function(){
	var payload ={}
	var div = document.getElementById('roomId');
	var name = document.getElementById('userName');
	payload.roomId = div.value;
	payload.device = 'desktop'
	payload.userName = name.value;
	if(roomId === ''){
		alter('invalid room')
	}else{
		socket.emit('newJoin', payload);
	}
}

var checkIn = function(){
	socket.emit("ping" , { msg: "I'm here..." })
}

