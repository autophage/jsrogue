var mapWidth = 60;
var mapHeight = 30;
var GAME_IN_PROGRESS = false;

var IN_TEXT_WINDOW = false;
var IN_INVENTORY = false;

var invHighlightCursor = 0;
var invCursor = 0;
var invCurLowerBound = 0;

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
    				if(invCursor != 0) {
	    				invCursor--;
	    			}
    				showInventory();
    				break;
    			case 40:
    				if(invCursor != player.inventory.length-1) {
	    				invCursor++;
	    			}
    				showInventory();
    				break;
    			case 68:
    				// User wants to drop current item
    				player.dropItem(invCursor);
    				showInventory();
    				break;
    			case 85:
    				// User wants to use current item
    				if(player.inventory[invCursor].canBeUsed) {
	    				player.inventory[invCursor].use(player);
	    			} else {
	    				console.log("The " + player.inventory[invCursor].name + " cannot be used.");
	    			}
    				break;
    			case 69:
    				// User wants to equip current item
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
	if(player.inventory.length<9) {
		invHighlightCursor = invCursor;
		drawInventoryScreen(player.inventory);
	} else {
		var subsetToDraw = [];
		
		if(invCursor<9) {
			invHighlightCursor = invCursor;
			for(i=0; i<9; i++) {
				subsetToDraw[i] = player.inventory[i];
			}
		} else {
			invCurLowerBound = invCursor;
			invHighlightCursor = 8;
			for(i=1; i<10; i++) {
				subsetToDraw.push(player.inventory[i + invCurLowerBound-9]);
			}
		}
		
		drawInventoryScreen(subsetToDraw);
	}
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
		
		if(item.isEquipped) {
			ctx.fillText("Equipped", 400, 80+40*index);
		}
		
		ctx.fillText(item.article + " " + item.material.name + " " + item.name, 90, 80+40*index);
		var itemActions = "(d)rop";
		if(item.canBeUsed) {
			itemActions += ", (u)se";
		}
		if(item.canBeEquipped) {
			itemActions += ", (e)quip";
		}
		ctx.fillText(itemActions, 620, 80+40*index);
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