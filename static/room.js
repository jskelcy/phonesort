module.exports = function Room(name, master){
	this.name = name;
	this.master = {name: master.name, id: master.id};
	this.connections = {};
	this.count = 1;
}
