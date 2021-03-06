var levelmaker = {};

// How many rooms to generate, before corridors are added
levelmaker.numberOfRooms = Math.floor(Math.random()* 40) + 20;

// Array that holds rooms, used for corridor generation before baking everything in
levelmaker.rooms = [];

// Array that holds corridors, which connect rooms
levelmaker.corridors = [];

// Array that holds items
levelmaker.items = [];

// Array of things with an eachTurn method
levelmaker.actors = [];

// Generates a room of random size and at random position, then adds it to the array of rooms
levelmaker.makeSquareRoom = function () {
	
	var size = Math.floor(Math.random()*10)
	
	var x = Math.floor(Math.random()*(mapWidth-10));
	
	var y = Math.floor(Math.random()*(mapHeight-10));
	
	return {
		x: x,
		y: y,
		width: (x + size),
		height: (y + size)
	}
}

// Goes through the array of rooms, and for each pair of rooms i and i+1 it creates a room (or two rooms) of width 1 to link them
levelmaker.makeCorridors = function () {
	var i = 0;
	for(r in levelmaker.rooms) {
		if(i < levelmaker.rooms.length - 1) {
			levelmaker.linkByCorridor(levelmaker.rooms[i], levelmaker.rooms[(i+1)]);
			i++;
		}
	}
}

levelmaker.linkByCorridor = function(a, b) {
	console.log('+-------------------------------------------------------+');
	console.log(a + ' getting linked to ' + b.x + ', ' + b.y + '.');
	var nca = {};
	var ncb = {};
	nca.x = (a.x<b.x ? a.x : b.x);
	console.log('   a.x was ' + a.x + ', b.x was ' + b.x + ', new corridor\'s x will be ' + nca.x + '.');
	nca.width = Math.abs(nca.x - (a.x>b.x ? a.x : b.x));
	console.log('   and the width linking them will be ' + nca.width);
	nca.y = (a.y<b.y ? a.y : b.y);
	nca.height = nca.y + (a.y>b.y ? a.y : b.y);
	console.log('adding room ' + nca);
	//TODO Add a room with coordinates from nca
}

// Sprinkle random items throughout the level
levelmaker.sprinkleItems = function (tiles, depth) {
	
	var numberOfItems = Math.floor(Math.random()*50)+depth;
	
	for(i=0; i<numberOfItems; i++) {
		var x_pos = Math.floor(Math.random() * mapWidth);
		var y_pos = Math.floor(Math.random() * mapHeight);
		var itemToAdd = items.getRandomItem(depth);
		tiles[x_pos][y_pos].occupants[tiles[x_pos][y_pos].occupants.length] = itemToAdd;
	}
}

levelmaker.generateLevel = function (depth) {
	
	var creaturesToAdd = Math.floor(Math.random()*20);
	
	// Until you've created a number of rooms equal to numberOfRooms, make another room
	for(i = 0; i < levelmaker.numberOfRooms; i++) {
		var roomToAdd = 0;
		for(;roomToAdd == 0; ){
			roomToAdd = levelmaker.makeSquareRoom();
			levelmaker.rooms[i] = roomToAdd;
		}
	}
	
	levelmaker.makeCorridors();
	
	tiles = [];
	
	for(cursorX=0; cursorX < mapWidth; cursorX++) {
		tiles[cursorX] = [];
		for(cursorY=0; cursorY < mapHeight; cursorY++) {
			tiles[cursorX][cursorY] = {};
			tiles[cursorX][cursorY].type = 'rock';
			tiles[cursorX][cursorY].occupants = [];
			tiles[cursorX][cursorY].occupants[0] = items.scenery[1]; // At the bottom of the stack, there's the wall; this is overwritten in the case of rooms below
			tiles[cursorX][cursorY].xPos = cursorX;
			tiles[cursorX][cursorY].yPos = cursorY;
		}
	}
	
	levelmaker.sprinkleItems(tiles, depth);
	
	for(i=0; i<(levelmaker.rooms.length-1); i++) {
		for(cursorX=levelmaker.rooms[i].x; cursorX<levelmaker.rooms[i].width; cursorX++) {
			for(cursorY=levelmaker.rooms[i].y; cursorY<levelmaker.rooms[i].height; cursorY++) {
				tiles[cursorX][cursorY].type = 'empty';
				tiles[cursorX][cursorY].occupants[0] = items.scenery[0];
			}
		}
	}
	
	tiles.actors = levelmaker.actors;
	
	for(i=0; i<creaturesToAdd; i++) {
		var roomToPutItIn = Math.floor(Math.random()*levelmaker.rooms.length);
		var xPosInRoom = Math.floor(Math.random()*levelmaker.rooms[roomToPutItIn].width);
		var yPosInRoom = Math.floor(Math.random()*levelmaker.rooms[roomToPutItIn].height);
		var xPosInLevel = levelmaker.rooms[roomToPutItIn].x + xPosInRoom;
		var yPosInLevel = levelmaker.rooms[roomToPutItIn].y + yPosInRoom;
		if((xPosInLevel < mapWidth) && (yPosInLevel < mapHeight)) {
			addACreature(xPosInLevel, yPosInLevel, tiles);
		}
	}

	return tiles;

}

levelmaker.generateBlankLevel = function(depth) {
	
	var tiles = [];
	
	for(cursorX=0; cursorX < mapWidth; cursorX++) {
		tiles[cursorX] = [];
		for(cursorY=0; cursorY < mapHeight; cursorY++) {
			tiles[cursorX][cursorY] = {};
			tiles[cursorX][cursorY].occupants = [];
			tiles[cursorX][cursorY].isPassable = false;
			tiles[cursorX][cursorY].xPos = cursorX;
			tiles[cursorX][cursorY].yPos = cursorY;
		}
	}
	
	for(walkers=0; walkers<5; walkers++) {
		levelmaker.DiggerWalker(tiles, (mapWidth/2), (mapHeight/2), 1000);
	}
	
	levelmaker.sprinkleItems(tiles, depth);
	
	tiles.actors = levelmaker.actors;
	
	return tiles;
}

levelmaker.digInitialRoom = function(tiles) {
	levelmaker.digSquareRoom(tiles,
		(mapWidth/2)-Math.floor(Math.random()*9),
		(mapHeight/2)-Math.floor(Math.random()*9),
		Math.floor(Math.random()*9)+3,
		Math.floor(Math.random()*9)+3);
}

levelmaker.digSquareRoom = function(level, x, y, width, height) {
	for(ix=0; ix<width; ix++) {
		for(iy=0; iy<height; iy++) {
			level[ix+x][iy+y].isPassable = true;
		}
	}
}

levelmaker.digSpace = function(level, x, y) {
	level[x][y].isPassable = true;
}

levelmaker.DiggerWalker = function(level, startX, startY, moves) {
	var x = startX;
	var y = startY;
	
	for(i=0; i<moves; i++) {
		levelmaker.digSpace(level, x, y);
		var directionToMove = Math.floor(Math.random()*5);
		switch(directionToMove) {
			case 0:
				break;
			case 1:
				x += 1;
				break;
			case 2:
				y += 1;
				break;
			case 3:
				x -= 1;
				break;
			case 4:
				y -= 1;
				break;
		}
		
		if(x<2) {
			x += 1;
		}
		
		if(y<2) {
			y+= 1;
		}
		
		if((x+2)>mapWidth) {
			x -= 1;
		}
		
		if((y+2)>mapHeight) {
			y -= 1;
		}
	}
	
}
