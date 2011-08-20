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
		console.log('generated an invalid room.');
		return 0;
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
	
	levelmaker.makeCorridors(levelmaker.numberOfRooms, levelmaker.rooms);

}