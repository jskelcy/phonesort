var Room = require('./static/room.js');
var activeRooms = {};
var socketToRoom = {}
var nextAvailableRoom = 0;




module.exports = function(io){
	return function(socket){
		socket.on('newRoom', function (payload){
			nextAvailableRoom++;
			var currentRoom = activeRooms[nextAvailableRoom];
			socket.join(nextAvailableRoom);
			var room = new Room(nextAvailableRoom, {roomId: payload.name,
				id: socket.id});
			currentRoom = room;
			socketToRoom[socket.id] = currentRoom;
			currentRoom.connections[socket.id] = {
				name: payload.userName,
				position: currentRoom.count
			}
			activeRooms[room.roomId] = room;
			console.log('new user '+ socket.id);
			socket.emit('joinStatus',{msg: 1, room: currentRoom});
		});

		socket.on('join', function(payload){
			console.log(payload)
			if(activeRooms[payload.roomId]){
				var currentRoom = activeRooms[payload.roomId];
				socket.join(payload.roomId);
				currentRoom.connections[socket.id] = {
					name: payload.userName,
					position: currentRoom.count
				}
				currentRoom.count++;
				socketToRoom[socket.id] = currentRoom;
				socket.emit('joinStatus',{msg: 2, room: currentRoom, socketId: socket.id});
			}else{
				socket.emit('joinStatus',{msg: 0})
			}
		});
		
        socket.on('soundRally', function(){
			var tuner = require('./static/tuner.js');
            sounds={};
            var i = 30;
            io.sockets.clients(socketToRoom[socket.id].name).forEach(function(currentSocket){
                sounds[currentSocket.id] = tuner[i];
            }
            )
            socket.broadcast.emit('soundRally', sounds);

			/*
            (function (obj){
				for (var prop in obj) {
    				if (obj.hasOwnProperty(prop)) {
       					keys.push(prop);
    				}
				}
			})(tuner);
			console.log(keys[Math.round(100*(Math.random()%keys.length))]);
			var sounds = {};
			io.sockets.clients(socketToRoom[socket.id].name).forEach(function(currentSocket){
				sounds[currentSocket.id] = tuner[keys[Math.round(100*(Math.random()%keys.length))]];
			});
			console.log(sounds);
			socket.broadcast.emit('soundRally',sounds);
            */
		});
	}
}
