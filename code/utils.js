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
	var xTileCoord = Math.floor(x / 16);
	var yTileCoord = Math.floor(y / 16);
	var occupantsString = ""+level[xTileCoord][yTileCoord].occupants;
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
