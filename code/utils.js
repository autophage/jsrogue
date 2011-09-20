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

utils.drawTextWindow = function(string, color, textColor) {
	
	IN_TEXT_WINDOW = true;
	var ctx = document.getElementById('levelmap').getContext('2d');
	
	// Draw the background
	ctx.fillStyle = color;
	ctx.fillRect(40, 40, 880, 400);
	
	//TODO: Fix off-by-one error or whatever the hell is going on here.
	//TODO: Make it so that IF string.charAt(i) is a newline, we just skip down to the next choppedString array element.
	var choppedString = [""];
	var currentIndex = 0;
	for(i=0; i<string.length; i++) {
		choppedString[currentIndex] += string.charAt(i);
		if(i%76==0) {
			currentIndex++;
			choppedString[currentIndex] = "";
		}
	}
		
	// Draw the text
	ctx.font = "bold 18px monospace";
	ctx.fillStyle = textColor;
	var verticalPosition = 68;
	var eachLineDown = 20;
	for(i=0; i<choppedString.length; i++) {
		ctx.fillText(choppedString[i], 60, verticalPosition);
		verticalPosition += eachLineDown;
	}
	// So that the user knows how to get the hell out of there
	ctx.fillText("Press any key to continue...", 330, 430);
}
