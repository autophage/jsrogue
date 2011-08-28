levelpainter = {};

levelpainter.paint = function(level) {
	 var ctx = document.getElementById('levelmap').getContext('2d');
	for(cursorX=0; cursorX<mapWidth; cursorX++) {
		for(cursorY=0; cursorY<mapHeight; cursorY++) {
			var toDraw = new Image();
			toDraw.src = level[cursorX][cursorY].occupants[(level[cursorX][cursorY].occupants.length - 1)].image;
			ctx.drawImage(toDraw,
				level[cursorX][cursorY].xPos*16,
				level[cursorX][cursorY].yPos*16,
				16, 16);
		}
	}
}
