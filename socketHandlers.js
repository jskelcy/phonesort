var Room = require('./room.js');

var activeRooms = {};
var socketToRoom = {}

module.exports = function(socket){ 
	socket.on('newJoin', function(payload){
		if(activeRooms[payload.roomId] === undefined){
			socket.join('group_' + payload.roomId);
			var room = new Room( payload.roomId, socket.id);
			activeRooms[payload.roomId]= room;
			socketToRoom[socket.id] = activeRooms[payload.roomId];
			activeRooms[payload.roomId].connections[socket.id] = {
				name: payload.userName,
				position: activeRooms[payload.roomId].count
			}
			console.log('new user '+ socket.id);
			socket.emit('joinStatus',{msg: 1, room: activeRooms[payload.roomId]});
		}else{
			socket.join( "group_" + payload.roomId );
			activeRooms[payload.roomId].connections[socket.id] = {
				name: payload.userName,
				position: activeRooms[payload.roomId].count
			}
			var room = activeRooms[payload.roomId]
			socketToRoom[socket.id] = room;
			socket.emit('joinStatus',{msg: 2, room: activeRooms[payload.roomId]});
		}
	});

	socket.on('ping', function(data){
		var myRoom = socketToRoom[socket.id];
		myRoom.connections[socket.id].position = myRoom.count;
		myRoom.count++;
		socket.emit('position', { 
			msg: "heres your position: " + myRoom.connections[socket.id].position,
			position: myRoom.connections[socket.id].position
		});
	});	
}