var domutils = {};

// Sets up DOM full of the right divs, etc
domutils.prepareLevel = function (tiles) {
	for(cursorY=0; cursorY < mapHeight; cursorY++) {
		for(cursorX=0; cursorX < mapWidth; cursorX++) {
			var textToAdd = '<div onmouseover="domutils.setTileDescription(' + cursorX + ', ' + cursorY + ')" class="tile ' + tiles[cursorX][cursorY].type + '">' + tiles[cursorX][cursorY].display + '</div>';
			$('div#mapcontainer').append(textToAdd);
		}
		$('div#mapcontainer').append('<br/>');
	}
}

domutils.setTileDescription = function(x, y) {
	var textToSet = x + ", " + y + ": ";
	for(var t in tiles[x][y].occupants) {
		textToSet += tiles[x][y].occupants[t].article + ' ' + tiles[x][y].occupants[t].name + ' made of ' + tiles[x][y].occupants[t].material.name + ', ';
	}
	$('div#tiledescription').text(textToSet);
}

domutils.updateMap = function(tiles) {
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