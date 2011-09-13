var utils = {};

utils.getObjectProperties = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
};

utils.pickADirectionAtRandom = function() {
	var direction = Math.floor(Math.random()*8);
	return direction;
};

utils.moveIsValid = function(level, x, y) {
	if(level[x][y].isPassable == true) {
		return true;
	} else {
		return false;
	}
};

utils.getTileOccupants = function(level, x, y) {
	var occupantsString = '';
	if(level[x][y].isPassable==false) {
		occupantsString = "Rock.";
	} else if(level[x][y].occupants.length == 0) {
		occupantsString = "Empty space";
	} else {
		occupantsString = "a ";
		for(var i in level[x][y].occupants) {
			occupantsString += level[x][y].occupants[i].material.name + " " + level[x][y].occupants[i].name + ", ";
		}
	}
	return occupantsString;
}

utils.getRandomEmptySpace = function(level) {
	var gotValidReturnStatus = false;
	var x=-1;
	var y=-1;
	while(!gotValidReturnStatus) {
		x = Math.floor(Math.random()*mapWidth);
		y = Math.floor(Math.random()*mapHeight);
		if(level[x][y].isPassable == true) {
			gotValidReturnStatus = true;
		}
	}
	return {
		x: x,
		y: y
	}
}
