module.exports = function Room(name, master){
	this.roomId = name;
	this.master = {name: master.name, id: master.id};
	this.connections = {};
	this.count = 1;
}
