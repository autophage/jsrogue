DIR_UP: 0;
DIR_UP_RIGHT: 1;
DIR_RIGHT: 2;
DIR_DOWN_RIGHT: 3;
DIR_DOWN: 4;
DIR_DOWN_LEFT: 5;
DIR_LEFT: 6;
DIR_UP_LEFT: 7;

var utils = {};

utils.getObjectProperties = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

utils.translate = function(objectToMove, direction) {
	switch(direction){
		case DIR_UP:
			objectToMove.position.y -= 1;
			break;
		case DIR_UP_RIGHT:
			objectToMove.position.x += 1;
			objectToMove.position.y -= 1;
			break;
		case DIR_RIGHT:
			objectToMove.position.x += 1;
			break;
		case DIR_DOWN_RIGHT:
			objectToMove.position.x += 1;
			objectToMove.position.y += 1;
			break;
		case DIR_DOWN:
			objectToMove.position.y += 1;
			break;
		case DIR_DOWN_LEFT:
			objectToMove.position.y += 1;
			objectToMove.position.x -= 1;
			break;
		case DIR_LEFT:
			objectToMove.position.x -= 1;
			break;
		case DIR_UP_LEFT:
			objectToMove.position.x -= 1;
			objectToMove.position.y -= 1;
			break;
	}
}

utils.pickADirectionAtRandom = function() {
	var direction = Math.floor(Math.random()*8);
	return direction;
}