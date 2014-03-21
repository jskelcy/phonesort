var join = function(){
	var payload = {}
	var div = document.getElementById('roomId');
	payload.roomId = div.value;
	payload.device = 'mobile';
	if(roomId === ''){
		alter('invalid room')
	}else{
		socket.emit('newJoin', payload);
	}
}