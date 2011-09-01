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
	
	currentLevel = levelmaker.generateLevel(20);
	turn = 0;
	
	levelpainter.paint(currentLevel);
	
	// TODO on mouse enters map area, register this
//	$("canvas#levelmap").mousemove(function(e){
//      var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
//     $("div#tiledescription").text("( e.pageX, e.pageY ) - " + pageCoords + "\n" + "( e.clientX, e.clientY ) - " + clientCoords);
//	$("div#tiledescription").text(utils.getTileOccupants(currentLevel, e.clientX, e.clientY));
//	levelpainter.placeRect(currentLevel, e.clientX, e.clientY);
//	});

	player = Player();
	player.setInitialPosition(15, 15, currentLevel);
    
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
			levelpainter.paint(currentLevel);
		} catch(e) {
			alert(e);
		}
	}
}

function addACreature(x, y, level) {
	var toAdd = new CreatureProto();
	if(level[x][y].occupants[0] == items.scenery[1]) {
		console.log('Cannot put a creature at ' + x + ', ' + y + '.  There is a wall in the way.');
		return;
	}
	toAdd.setInitialPosition(x, y, level);
	level.actors.push(toAdd);
}

window.addEventListener("load", initGame, false);