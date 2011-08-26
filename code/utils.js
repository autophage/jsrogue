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

utils.isLocationAWall = function(x, y, level) {
	if(level[x][y].occupants[0] == items.scenery[1]) {
		return true;
	} else {
		return false;
	}
};
