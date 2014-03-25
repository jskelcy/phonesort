var Room = require('./static/room.js');

var activeRooms = {};
var socketToRoom = {}
var nextAvailableRoom = 0;

module.exports = function(socket){ 
	socket.on('newRoom', function (payload){
			nextAvailableRoom++;
			var currentRoom = activeRooms[nextAvailableRoom];
			socket.join(nextAvailableRoom);
			var room = new Room(nextAvailableRoom, {name: payload.name,
				id: socket.id});
			currentRoom = room;
			socketToRoom[socket.id] = currentRoom;
			currentRoom.connections[socket.id] = {
				name: payload.userName,
				position: currentRoom.count
			}
			console.log('new user '+ socket.id);
			socket.emit('joinStatus',{msg: 1, room: currentRoom});
	});

	socket.on('join', function(payload){
		if(activeRooms[payload.roomId]){
			var currentRoom = activeRooms[payload.roomId];
			socket.join(payload.roomId);
			currentRoom.connections[socket.id] = {
				name: payload.userName,
				position: currentRoom.count
			}
			currentRoom.count++;
			socketToRoom[socket.id] = currentRoom;
			socket.emit('joinStatus',{msg: 2, room: currentRoom});
		}else{
			socket.emit('joinStatus',{msg: 0})
		}

	});
/*
	socket.on('soundRally'){
		var sounds = {};
		io.sockets.clients(socketToRoom[socket.id].name).forEach(function(currentSocket){
			//populate the sounds
		});
	}
	*/
}
