var levelmaker = {};

// How many rooms to generate, before corridors are added
levelmaker.numberOfRooms = Math.floor(Math.random()* 40) + 20;

// Array that holds rooms, used for corridor generation before baking everything in
levelmaker.rooms = [];

// Array that holds corridors, which connect rooms
levelmaker.corridors = [];

// Array that holds items
levelmaker.items = [];

// Generates a room of random size and at random position, then adds it to the array of rooms
levelmaker.makeSquareRoom = function () {
	var roomWidth = Math.floor(Math.random()*(mapWidth - 20));
	var roomHeight = Math.floor(Math.random()*(mapHeight - 15));
	
	
	var maxLeftMargin = mapWidth - roomWidth;
	var maxUpperMargin = mapHeight - roomHeight;
	
	var x, y;
	
	x = Math.floor(Math.random()*maxLeftMargin);
	y = Math.floor(Math.random()*maxUpperMargin);
	
	return {
		x: x,
		y: y,
		width: (roomWidth + 1),
		height: (roomHeight + 1)
	}
}

// Goes through the array of rooms, and for each pair of rooms i and i+1 it creates a room (or two rooms) of width 1 to link them
levelmaker.makeCorridors = function () {
	for(corridorNo=0; corridorNo < (levelmaker.rooms.length - 2); corridorNo++) {
		levelmaker.linkByCorridor(levelmaker.rooms[corridorNo], levelmaker.rooms[(corridorNo + 1)]);
	}
}

// Creates a corridor between two rooms
levelmaker.linkByCorridor = function (firstRoom, secondRoom) {
	if(secondRoom.x < firstRoom.x && firstRoom.x < (secondRoom.x + secondRoom.width)) {
		levelmaker.corridors[levelmaker.corridors.length] = {
			x: levelmaker.randomOverlappingValue(firstRoom.x, (firstRoom.x + firstRoom.width), secondRoom.x, (secondRoom.x + secondRoom.width)),
			y: levelmaker.whichIsHigher(firstRoom.y, secondRoom.y),
			width: 1,
			height: Math.abs(firstRoom.y - secondRoom.y)
		}
	} else if(secondRoom.y < firstRoom.y && firstRoom.y < (secondRoom.y + secondRoom.height)) {
		levelmaker.corridors[levelmaker.corridors.length] = {
			y: levelmaker.randomOverlappingValue(firstRoom.y, (firstRoom.y + firstRoom.height), secondRoom.y, (secondRoom.y + secondRoom.height)),
			x: levelmaker.whichIsHigher(firstRoom.x, secondRoom.x),
			height: 1,
			width: Math.abs(firstRoom.x - secondRoom.x)
		}
	} else {
		var destinationPoint = {};
		destinationPoint.x = levelmaker.randomOverlappingValue(firstRoom.x, (firstRoom.x + firstRoom.width), secondRoom.x, (secondRoom.x + secondRoom.width));
		destinationPoint.y = levelmaker.randomOverlappingValue(firstRoom.y, (firstRoom.y + firstRoom.height), secondRoom.y, (secondRoom.y + secondRoom.height));
		levelmaker.corridors[levelmaker.corridors.length] = {
			x: destinationPoint.x,
			y: levelmaker.whichIsHigher(firstRoom.y, secondRoom.y),
			width: 1,
			height: Math.abs(firstRoom.y - secondRoom.y)
		}
		levelmaker.corridors[levelmaker.corridors.length] = {
			x: levelmaker.whichIsHigher(firstRoom.x, secondRoom.x),
			y: destinationPoint.y,
			width: Math.abs(firstRoom.x - secondRoom.x),
			height: 1
		}
	}
}

levelmaker.randomOverlappingValue = function(first, second, third, fourth) {
	var args = Array.prototype.slice.call(arguments);
	var sortedArgs = args.sort();
	var spacer = sortedArgs[2] - sortedArgs[1];
	var result = Math.abs(Math.floor(Math.random()*spacer));
	return result;
}

levelmaker.whichIsHigher = function(first, second) {
	if(first > second) {
		return first;
	} else {
		return second;
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
		var roomToAdd = 0;
		for(;roomToAdd == 0; ){
			roomToAdd = levelmaker.makeSquareRoom();
			levelmaker.rooms[i] = roomToAdd;
		}
	}
	
	levelmaker.makeCorridors();
	
	var tiles = [];
	
	for(cursorX=0; cursorX < mapWidth; cursorX++) {
		tiles[cursorX] = [];
		for(cursorY=0; cursorY < mapHeight; cursorY++) {
			tiles[cursorX][cursorY] = {};
			tiles[cursorX][cursorY].display = ".";
			tiles[cursorX][cursorY].type = 'rock';
		}
	}
	
	for(i=0; i<(levelmaker.rooms.length-1); i++) {
		for(cursorX=levelmaker.rooms[i].x; cursorX<levelmaker.rooms[i].width; cursorX++) {
			for(cursorY=levelmaker.rooms[i].y; cursorY<levelmaker.rooms[i].height; cursorY++) {
				tiles[cursorX][cursorY].display = '.';
				tiles[cursorX][cursorY].type = 'empty';
			}
		}
	}
	
	for(i=0; i<(levelmaker.corridors.length-1); i++) {
		for(cursorX=levelmaker.corridors[i].x; cursorX<levelmaker.corridors[i].width; cursorX++) {
			for(cursorY=levelmaker.corridors[i].y; cursorY<levelmaker.corridors[i].height; cursorY++) {
				tiles[cursorX][cursorY].display = '.';
				tiles[cursorX][cursorY].type = 'empty';
			}
		}
	}
	
	return tiles;

}