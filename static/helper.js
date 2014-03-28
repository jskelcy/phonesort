	var login;
	var piano;
	var master;	

window.onload = function(){
	login = $('#login');
	master = $('#master');
	piano = $('#piano');

	piano.hide();
	master.hide();

}

var newRoom = function(){
	payload= {};
	var name = document.getElementById('userName');
	payload.device = 'desktop';
	payload.name = name.value;
	socket.emit('newRoom', payload);
	login.toggle();
	master.toggle();
}

var join = function(){
	var payload ={}
	var newRoomId = document.getElementById('roomId');
	var name = document.getElementById('userName');
	payload.roomId = roomId.value;
	payload.device = 'desktop'
	payload.userName = name.value;
	if(roomId === ''){
		alter('invalid room')
		return;
	}else{
		console.log(payload)	
		socket.emit('join', payload);
	}
	
	login.toggle();
	piano.toggle();
}

var soundRally = function(){
	socket.emit('soundRally');
}

