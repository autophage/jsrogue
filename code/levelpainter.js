levelpainter = {};

levelpainter.paint = function(level) {
	var ctx = document.getElementById('levelmap').getContext('2d');
	for(cursorX=0; cursorX<mapWidth; cursorX++) {
		for(cursorY=0; cursorY<mapHeight; cursorY++) {
			levelpainter.updateTile(level, cursorX, cursorY);
		}
	}
}

levelpainter.updateTile = function(level, x, y) {
	var ctx = document.getElementById('levelmap').getContext('2d');
	
	if(level[x][y].isPassable == false) {
		ctx.fillStyle = "rgb(100, 75, 50)";
		ctx.fillRect(level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
	} else if(level[x][y].isPassable == true) {
		
		ctx.fillStyle = "rgb(225, 200, 175)";
		ctx.fillRect(level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
		
		if(level[x][y].occupants.length != 0) {
			var toDraw = new Image();
			var whatToDraw = level[x][y].occupants.length - 1;
			toDraw.src = level[x][y].occupants[whatToDraw].image;
			ctx.drawImage(toDraw, level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
		}
	}
}

levelpainter.placeRect = function(level, x, y) {
	var ctx = document.getElementById('levelmap').getContext('2d');
	ctx.clearRect(level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
}

levelpainter.clearScreen = function() {
	var ctx = document.getElementById('levelmap').getContext('2d');
	ctx.clearRect(0, 0, 960, 480);
}
