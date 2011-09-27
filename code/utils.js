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

utils.moveIsAttack = function(level, x, y) {
	for(n in level[x][y].occupants) {
		if(level[x][y].occupants[n].limbs!=undefined) {
			return true;
		}
	}
	return false;
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

utils.drawTextWindow = function(string) {
	
	IN_TEXT_WINDOW = true;
	var ctx = document.getElementById('levelmap').getContext('2d');
	
	// Draw the background
	ctx.fillStyle = 'rgba(50, 42, 25, 1)';
	ctx.fillRect(40, 40, 880, 400);
	
	//TODO: Gracefully handle word breaks, so that if the end of a line happens mid-word the whole word gets shoved onto the next line
	var choppedString = [""];
	var currentIndex = -1;
	for(i=0; i<string.length; i++) {
		
		if(string.charAt(i)=="\n") {
				currentIndex++;
				choppedString.push("");
				i++;
		}
		
		if(i%76==0) {
			currentIndex++;
			choppedString.push("");
		}
		choppedString[currentIndex] += string.charAt(i);
	}
		
	// Draw the text
	ctx.font = "bold 18px monospace";
	ctx.fillStyle = 'rgba(200, 200, 200, 1)';
	var verticalPosition = 68;
	var eachLineDown = 20;
	for(i=0; i<choppedString.length; i++) {
		console.log(choppedString[i]);
		ctx.fillText(choppedString[i], 60, verticalPosition);
		verticalPosition += eachLineDown;
	}
	// So that the user knows how to get the hell out of there
	ctx.fillText("Press any key to continue...", 330, 430);
}

utils.getItems = function(actor, level, x, y) {
	if(level[x][y].occupants.length!=1) {
		for(n in level[x][y].occupants) {
			if(level[x][y].occupants[n]!=actor) {
				var toGive = level[x][y].occupants[n];
				level[x][y].occupants.splice(n);
				actor.inventory.push(toGive);
			}
		}
	} else {
		console.log("Nothing to pick up.");
	}
	levelpainter.paint();
}

utils.getIndexOf = function(arr, item) {
	for(i=0; i<arr.length; i++) {
		if(arr[i] == item) {
			return i;
		}
	}
	return false;
}
