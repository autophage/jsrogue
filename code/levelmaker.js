var levelmaker = {};

// How many rooms to generate, before corridors are added
levelmaker.numberOfRooms = Math.floor(Math.random()* 10) + 3;

// Array that holds rooms, used for corridor generation before baking everything in
levelmaker.rooms = [];

// Array that holds items
levelmaker.items = [];

// Generates a room of random size and at random position, then adds it to the array of rooms
levelmaker.makeSquareRoom = function () {
	var startX, startY, endX, endY;
	startX = Math.floor(Math.random()*mapWidth);
	startY = Math.floor(Math.random()*mapHeight);
	endX = startX + Math.floor(Math.random()*15);
	endY = startX + Math.floor(Math.random()*15);
	if ((endX > mapWidth) || (endY > mapHeight)) {
		levelmaker.makeSquareRoom();
	}
	
	return {
		startX: startX.toString(),
		startY: startY.toString(),
		endX: endX.toString(),
		endY: endY.toString()
	};
}

// Goes through the array of rooms, and for each pair of rooms i and i+1 it creates a room (or two rooms) of width 1 to link them
levelmaker.makeCorridors = function (numberOfRooms, rooms) {
	var corridorCount = 0;
	for(i = 0; i < numberOfRooms; i++) {
		if( (levelmaker.rooms[i].endX < levelmaker.rooms[i+1].startX) || (levelmaker.rooms[i].startX > levelmaker.rooms[i+1].endX) ) {
			rooms[numberOfRooms + corridorCount] = {
				startX: rooms[i].startX,
				endX: rooms[i+1].startX,
				startY: rooms[i].startY,
				endY: rooms[i].startY
			}
		}
	}
}

// Takes the array of rooms and sets the DOM up to represent it
levelmaker.bakeLevel = function () {
/*	for(i=0; i<mapHeight; i++) {
		for(j = 0; j < mapWidth; j++) {
			for(k = 0; k < levelmaker.numberOfRooms; k++) {
				if((j > levelmaker.rooms[k].startX) && (j < levelmaker.rooms[k].endX) && (i > levelmaker.rooms[k].startY) && (i < levelmaker.rooms[k].endY)) {
					$('div#mapcontainer').append('<div class="tile">.</div');
				} else if (!((j > levelmaker.rooms[k].startX) && (j < levelmaker.rooms[k].endX) && (i > levelmaker.rooms[k].startY) && (i < levelmaker.rooms[k].endY))){
					$('div#mapcontainer').append('<div class="tile">#</div');
				}
			}
		}
		$('div#mapcontainer').append('<br/>');
	}
*/
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
	
	var temp = {};
	
	for(i = 0; i < levelmaker.rooms.length; i++) {
		for(cursorX = parseInt(levelmaker.rooms[i].startX); cursorX < parseInt(levelmaker.rooms[i].endX); cursorX++) {
			for(cursorY = parseInt(levelmaker.rooms[i].startY); cursorY < parseInt(levelmaker.rooms.endY); cursorY++) {
				levelmaker.tileArray[cursorX][cursorY] = '<div class="tile" id="x' + cursorX + 'y' + cursorY + '">o</div>';
				$('div#mapcontainer div#x' + cursorX + 'y' + cursorY).html(levelmaker.tileArray[cursorX][cursorY]);
			}
		}
		
	}
}

// Sprinkle random items throughout the level
levelmaker.addItems = function (depth) {
	
	var numberOfItems = Math.floor(Math.random()*50)+depth;
	
	for(i=0; i<numberOfItems; i++) {
		items[i] = {
			x_pos: Math.floor(Math.random() * mapWidth),
			y_pos: Math.floor(Math.random() * mapHeight),
			item_type: items[Math.floor(Math.random() * items.length)],
			material: materials[Math.floor(Math.random() * materials.length)]
		}
	}
}

levelmaker.generateLevel = function (depth) {
	
	// Until you've created a number of rooms equal to numberOfRooms, make another room
	for(i = 0; i < levelmaker.numberOfRooms; i++) {
		roomToAdd = levelmaker.makeSquareRoom();
		levelmaker.rooms[i] = roomToAdd;
	}
	
	levelmaker.makeCorridors(levelmaker.numberOfRooms, levelmaker.rooms);

}