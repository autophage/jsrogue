var domutils = {};

// Sets up DOM full of the right divs, etc
domutils.prepareLevel = function () {

	levelmaker.tileArray = [];
	
	for(currentRow = 0; currentRow < mapHeight; currentRow++) {
		levelmaker.tileArray[currentRow] = [];
		for (currentColumn = 0; currentColumn < mapWidth; currentColumn++) {
			levelmaker.tileArray[currentRow][currentColumn] = '<div class="tile" id="x' + currentColumn + 'y' + currentRow + '">#</div>';
			$('div#mapcontainer').append(levelmaker.tileArray[currentRow][currentColumn]);
		}
		levelmaker.tileArray[currentRow][mapWidth] = '<br/>';
		$('div#mapcontainer').append(levelmaker.tileArray[currentRow][mapWidth]);
	}

}

domutils.updateMap = function() {
	for(i = 0; i < levelmaker.rooms.length; i++) {
		console.log('we SHOULD be updating room ' + i + ' now.');
		for(cursorX = parseInt(levelmaker.rooms[i].startX); cursorX < parseInt(levelmaker.rooms[i].endX); cursorX++) {
			console.log('  we SHOULD be doing stuff using ' + cursorX + ' now.');
			for(cursorY = parseInt(levelmaker.rooms[i].startY); cursorY < parseInt(levelmaker.rooms[i].endY); cursorY++) {
				console.log('    we SHOULD be setting ' + cursorX + ', ' + cursorY + ' to display "' + i + '" now.');
				levelmaker.updateDOM(cursorX, cursorY, i)
			}
		}
		
	}
	
	return levelmaker.tileArray;
}

domutils.updateDOM = function(x, y, to_display) {
	if(x>=mapWidth || y>=mapHeight) {
		console.log('----something wrong!');
		console.log('tried to update x=' + x + ', y=' + y);
		return 0;
	}
	var divToSearchFor = 'div#mapcontainer div#x' + y + 'y' + x;
	console.log('current div to search for: ' + divToSearchFor);
	levelmaker.tileArray[x][y] = '<div class="tile" id="x' + x + 'y' + y + '">' + to_display + '</div>';
	$(divToSearchFor).text(to_display);
}