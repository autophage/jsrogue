var mapWidth = 60;
var mapHeight = 30;
var GAME_IN_PROGRESS = false;

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
		var canvasOffset = $('canvas#levelmap').offset();
		var offsetX = e.clientX-canvasOffset.left;
		var offsetY = e.clientY-canvasOffset.top;
		var canvasCoords = "( " + offsetX + ", " + offsetY + " )";
		var xTile = Math.floor(offsetX/16);
		var yTile = Math.floor(offsetY/16);
		$("div#tiledescription").text(Math.floor(offsetX/16) + ", " + Math.floor(offsetY/16) + ": " + utils.getTileOccupants(currentLevel, xTile, yTile));
		levelpainter.paint(currentLevel);
		levelpainter.updateTile(currentLevel, xTile, yTile, true);
	});

	player = Player();
	
	var playerStartCoords = utils.getRandomEmptySpace(currentLevel);
	
	player.setInitialPosition(playerStartCoords.x, playerStartCoords.y, currentLevel);
	
	levelpainter.paint(currentLevel);
    
    $('canvas#levelmap').attr("tabindex", "0").keydown(function(e) {
    	e.preventDefault();
    	console.log(' - key ' + e.which + ' was pressed.');
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
	levelpainter.clearScreen();
	levelpainter.paint(currentLevel);
}

function addACreature(x, y, level) {
	var toAdd = new CreatureProto();
	var position = utils.getRandomEmptySpace(currentLevel);
	toAdd.setInitialPosition(position.x, position.y, level);
	level.actors.push(toAdd);
}

window.addEventListener("load", initGame, false);