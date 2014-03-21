var activeRooms = {};

var socketToRoom = {}

function Room(id, master){
	this.id = id;
	this.master= master;
	this.connections = {};
	this.count = 0;
}



module.exports = function(socket){ 
	socket.on('newJoin', function(payload){
		if(activeRooms[payload.id] === undefined){
			if(payload.device === 'desktop'){
				socket.join('group_' + payload.roomId);
				var room = new Room( payload.roomId, socket.id);
				activeRooms[1]= room;
				socketToRoom[socket.id] = activeRooms[payload.roomId];
				activeRooms[1].connections[socket.id] = {
					position: null
				}
				console.log('new user '+ socket.id);
				socket.emit('joinStatus', 1);
			}else{
				socket.emit('joinStatus', 0);
			}
		}else{
			socket.join( "group_" + payload.roomId );
			activeRooms[1].connections[socket.id] = {
				position: null
			}
			var room = activeRooms[1]
			socketToRoom[socket.id] = room;
			socket.emit('joinStatus',1);
		}
	});

	socket.on('ping', function(data){
		console.log(socketToRoom);
		var myRoom = socketToRoom[socket.id];
		myRoom.connections[socket.id].position = myRoom.count;
		myRoom.count++;
		socket.emit('position', { 
			msg: "heres your position: " + myRoom.connections[socket.id].position,
			position: myRoom.connections[socket.id].position
		});
	});	
}