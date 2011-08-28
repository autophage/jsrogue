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
	var toDraw = new Image();
	toDraw.src = level[x][y].occupants[(level[x][y].occupants.length - 1)].image;
	ctx.drawImage(toDraw, level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
}

levelpainter.placeRect = function(level, x, y) {
	var ctx = document.getElementById('levelmap').getContext('2d');
	ctx.strokeRect(level[x][y].xPos*16, level[x][y].yPos*16, 16, 16);
}
