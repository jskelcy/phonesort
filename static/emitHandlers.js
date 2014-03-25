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
			console.log('you have joined room ' + data.room.name+ ' there are currently no other users in the room');
			console.log('you are the master');
			break;
		case(2):
			console.log(data.room.connections)
			var nameList = ''
			for(var bro in data.room.connections){
				if(data.room.connections.hasOwnProperty(bro))
					nameList = nameList +", "+ data.room.connections[bro].name;
			}
			var bro = data.room
			console.log('you have joined room with ' + nameList);
			console.log('The master of the rooom is '+ data.room.master.name);
	}
})