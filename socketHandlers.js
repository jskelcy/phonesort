var Room = require('./room.js');

var activeRooms = {};
var socketToRoom = {}
var nextAvailableRoom = 0;

module.exports = function(socket){ 
	socket.on('newRoom', function (payload){
			nextAvailableRoom++;
			socket.join(nextAvailableRoom);
			var room = new Room( nextAvailableRoom, {name: payload.name,
				id: socket.id});
			activeRooms[nextAvailableRoom] = room;
			socketToRoom[socket.id] = activeRooms[nextAvailableRoom];
			activeRooms[nextAvailableRoom].connections[socket.id] = {
				name: payload.userName,
				position: activeRooms[nextAvailableRoom].count
			}
			console.log('new user '+ socket.id);
			socket.emit('joinStatus',{msg: 1, room: activeRooms[nextAvailableRoom]});
	});

	socket.on('join', function(payload){
		console.log('there is someone trying to join room '+ payload.roomId)
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
}
