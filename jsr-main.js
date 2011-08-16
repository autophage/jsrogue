var mapWidth = 90;
var mapHeight = 30;

function initGame() {
	
	// Did we make any changes that broke item generation?
	function areItemsWorking() {
		itemYouFoundSeed = Math.floor(Math.random()*3);
		materialOfItemYouFoundSeed = Math.floor(Math.random()*13);
		
		var stringToPrint = "You found a " + items[itemYouFoundSeed].name + " made of " + materials[materialOfItemYouFoundSeed].name + "!";
		
		alert( stringToPrint );
	}

	
	generateLevel(1);

}

function generateLevel(depth) {
	
	// depth will be used for how far down the level is.
	
	// How many rooms to generate, before corridors are added
	var numberOfRooms = Math.floor(Math.random()* 10) + 3;
	
	// Array that holds rooms, used for corridor generation before baking everything in
	var rooms = [];
	
	// Array that holds items
	var items = [];
	
	// Generates a room of random size and at random position, then adds it to the array of rooms
	function makeSquareRoom(upperLimit) {
		var startX, startY, endX, endY;
		startX = Math.floor(Math.random()*mapWidth);
		startY = Math.floor(Math.random()*mapHeight);
		endX = startX + Math.floor(Math.random()*upperLimit);
		endY = startX + Math.floor(Math.random()*upperLimit);
		if ((endX > mapWidth) || (endY > mapHeight)) {
			makeSquareRoom(upperLimit);
		}
		alert(startX, startY, endX, endY);
		return {
			startX: startX.toString(),
			startY: startY.toString(),
			endX: endX.toString(),
			endY: endY.toString()
		};
	}
	
	// Goes through the array of rooms, and for each pair of rooms i and i+1 it creates a room (or two rooms) of width 1 to link them
	function makeCorridors() {
		var corridorCount = 0;
		for(i = 0; i < numberOfRooms; i++) {
			if( (parseInt(rooms[i].endX) < parseInt(rooms[i+1].startX)) || (parseInt(rooms[i].startX) > parseInt(rooms[i+1].endX)) ) {
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
	function bakeRooms() {
		for(i=0; i<mapHeight; i++) {
			for(j = 0; j < mapWidth; j++) {
				for(k = 0; k < numberOfRooms; k++) {
					if((j > parseInt(rooms[k].startX)) && (j < parseInt(rooms[k].endX)) && (i > parseInt(rooms[k].startY)) && (i < parseInt(rooms[k].endY))) {
						$('tr#' + i + ' td#' + j).text('.');
					} else {
						$('tr#' + i + ' td#' + j).text('#');
					}
				}
			}
		}
	}
	
	// Sprinkle random items throughout the level
	function addItems(depth) {
		
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

	// Until you've created a number of rooms equal to numberOfRooms, make another room
	for(i = 0; i > numberOfRooms; i++) {
		roomToAdd = makeSquareRoom(15);
		rooms[i] = roomToAdd;
	}
	
	makeCorridors();
	
	bakeRooms();
	
}

window.addEventListener("load", initGame, false);