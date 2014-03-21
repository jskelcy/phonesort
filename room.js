module.exports = function Room(id, master){
	this.id = id;
	this.master= master;
	this.connections = {};
	this.count = 1;
}
