var join = function(){
	var payload ={}
	var div = document.getElementById('roomId');
	payload.roomId = div.value;
	payload.device = 'desktop'
	if(roomId === ''){
		alter('invalid room')
	}else{
		socket.emit('newJoin', payload);
	}
}

var checkIn = function(){
	socket.emit("ping" , { msg: "I'm here..." })
}

