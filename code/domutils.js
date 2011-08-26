var domutils = {};

// Sets up DOM full of the right divs, etc
domutils.prepareLevel = function (tiles) {
	for(cursorY=0; cursorY < mapHeight; cursorY++) {
		for(cursorX=0; cursorX < mapWidth; cursorX++) {
			var textToAdd = '<div onmouseover="domutils.setTileDescription(' +
				cursorX + ', ' + cursorY +
				')" class="tile" id="x' + cursorX + 'y' + cursorY + '">' +
				'<img class="item" src="' + tiles[cursorX][cursorY].occupants[(tiles[cursorX][cursorY].occupants.length - 1)].image + '"></img>' +
				'</div>';
			$('div#mapcontainer').append(textToAdd);
		}
		$('div#mapcontainer').append('<br/>');
	}
}

domutils.redrawLevel = function(level) {
	for(y=0; y < mapHeight; y++) {
		for(x=0; x < mapWidth; x++) {
			domutils.updateDOM(x, y, level[x][y]);
		}
	}
}

domutils.setTileDescription = function(x, y) {
	var textToSet = x + ", " + y + ": ";
	for(var t in tiles[x][y].occupants) {
		textToSet += tiles[x][y].occupants[t].article + ' ' + tiles[x][y].occupants[t].name + ' made of ' + tiles[x][y].occupants[t].material.name + ', ';
	}
	$('div#tiledescription').text(textToSet);
}

domutils.updateDOM = function(x, y) {
	var divToSearchFor = 'div#mapcontainer div#x' + x + 'y' + y;
	$(divToSearchFor).replaceWith(
		'<div onmouseover="domutils.setTileDescription(' +
				x + ', ' + y +
				')" class="tile" id="x' + x + 'y' + y + '">' +
				'<img class="item" src="' + currentLevel[x][y].occupants[(currentLevel[x][y].occupants.length - 1)].image + '"></img>' +
				'</div>');
}