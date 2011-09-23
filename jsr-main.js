var mapWidth = 60;
var mapHeight = 30;
var GAME_IN_PROGRESS = false;

var IN_TEXT_WINDOW = false;
var IN_INVENTORY = false;

var invHighlightCursor = 0;

var WAIT = 0;
var NORTH = 1;
var NORTHEAST = 2;
var EAST = 3;
var SOUTHEAST = 4;
var SOUTH = 5;
var SOUTHWEST = 6;
var WEST = 7;
var NORTHWEST = 8;

function initGame() {
	
	currentLevel = levelmaker.generateBlankLevel(20);
	turn = 0;
	
	$("canvas#levelmap").mousemove(function(e){
		if(!IN_TEXT_WINDOW && !IN_INVENTORY) {
			var canvasOffset = $('canvas#levelmap').offset();
			var offsetX = e.clientX-canvasOffset.left;
			var offsetY = e.clientY-canvasOffset.top;
			var canvasCoords = "( " + offsetX + ", " + offsetY + " )";
			var xTile = Math.floor(offsetX/16);
			var yTile = Math.floor(offsetY/16);
			$("div#tiledescription").text(Math.floor(offsetX/16) + ", " + Math.floor(offsetY/16) + ": " + utils.getTileOccupants(currentLevel, xTile, yTile));
			levelpainter.paint(currentLevel);
			levelpainter.updateTile(currentLevel, xTile, yTile, true);
		}
	});

	player = Player();
	
	player.inventory.push(items.list[6]);			// Give the player a pickaxe
	player.inventory[0].material = materials[2];	// made of steel
	
	player.inventory.push(items.list[2]);			// Give the player a biscuit
	player.inventory[1].material = materials[12];	// made of cheese
	
	var playerStartCoords = utils.getRandomEmptySpace(currentLevel);
	
	player.setInitialPosition(playerStartCoords.x, playerStartCoords.y, currentLevel);
	
	levelpainter.paint(currentLevel);
    
    $('canvas#levelmap').attr("tabindex", "0").keydown(function(e) {
    	e.preventDefault();
    	console.log(' - key ' + e.which + ' was pressed.');
    	if(IN_TEXT_WINDOW) {
    		IN_TEXT_WINDOW = false;
    		levelpainter.clearScreen();
    		levelpainter.paint(currentLevel);
    		return;
    	}
    	if(IN_INVENTORY) {
    		switch(e.which) {
    			case 27:
    				IN_INVENTORY = false;
    				levelpainter.clearScreen();
    				levelpainter.paint(currentLevel);
    				break;
    			case 38:
    				if(invHighlightCursor != 0) {
	    				invHighlightCursor--;
	    			}
    				showInventory();
    				break;
    			case 40:
    			//TODO: Change this so that it relates to player's inventory, I'm only using this value because I'm faking an inventory to test the screen
    				if(invHighlightCursor != 4) {
	    				invHighlightCursor++;
	    			}
    				showInventory();
    				break;
    		}
    		return;
    	}
    	switch(e.which) {
    		case 38:
    			player.move(NORTH, currentLevel);
    			break;
    		case 33:
    			player.move(NORTHEAST, currentLevel);
    			break;
    		case 39:
    			player.move(EAST, currentLevel);
    			break;
    		case 34:
    			player.move(SOUTHEAST, currentLevel);
    			break;
    		case 40:
    			player.move(SOUTH, currentLevel);
    			break;
    		case 35:
    			player.move(SOUTHWEST, currentLevel);
    			break;
    		case 37:
    			player.move(WEST, currentLevel);
    			break;
    		case 36:
    			player.move(NORTHWEST, currentLevel);
    			break;
    		case 12:
    			player.move(WAIT, currentLevel);
    			break;
    		case 68:
    			console.log("You pressed 'd', for Dig!  Digging is not implemented yet.");
    			break;
    		case 73:
    			invHighlightCursor = 0;
    			showInventory();
    			break;
    		case 71:
    			utils.getItems(player, currentLevel, player.position.x, player.position.y);
    		default:
    			console.log('  -- Not a valid keypress.  Ignoring it. --');
    	}
    	doATurn();
    });

}

function doATurn() {
	for(a in currentLevel.actors) {
		try {
			currentLevel.actors[a].eachTurn(currentLevel);
		} catch(e) {
			alert(e);
		}
	}
	if(!IN_INVENTORY) {
		levelpainter.clearScreen();
		levelpainter.paint(currentLevel);
	}
}

function addACreature(x, y, level) {
	var toAdd = new CreatureProto();
	var position = utils.getRandomEmptySpace(currentLevel);
	toAdd.setInitialPosition(position.x, position.y, level);
	level.actors.push(toAdd);
}

function showInventory() {
	IN_INVENTORY = true;
	
	drawInventoryScreen(player.inventory);
		
}

function drawInventoryScreen(array) {

	var ctx = document.getElementById('levelmap').getContext('2d');
	ctx.font = "bold 18px monospace";
	
	// Draw the background
	ctx.fillStyle = 'rgba(50, 42, 25, 1)';
	ctx.fillRect(40, 40, 880, 400);

	var drawInventoryEntry = function(item, index, isHighlighted) {
		if(isHighlighted) {
			ctx.fillStyle = 'rgba(100, 85, 50, 1)';
		} else {
			ctx.fillStyle = 'rgba(100, 85, 50, .6)';
		}
		ctx.fillRect(80, 60+40*index, 800, 30);
		
		if(isHighlighted) {
			ctx.fillStyle = 'rgba(200, 200, 200, 1)';
		} else {
			ctx.fillStyle = 'rgba(200, 200, 200, .6)';
		}
		ctx.fillText(item.article + " " + item.material.name + " " + item.name, 90, 80+40*index);
	}
	
		for(i=0; i<array.length; i++) {
		if(i==invHighlightCursor) {
			drawInventoryEntry(array[i], i, true);
		} else {
			drawInventoryEntry(array[i], i, false);
		}
	}

	ctx.fillStyle = 'rgba(200, 200, 200, 1)';
	ctx.fillText("Press escape to return to game...", 330, 430);
	
}

window.addEventListener("load", initGame, false);