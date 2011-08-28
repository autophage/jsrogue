var mapWidth = 60;
var mapHeight = 30;

function initGame() {
	
	currentLevel = levelmaker.generateLevel(20);
	turn = 0;
	
	levelpainter.paint(currentLevel);
	
	// TODO on mouse enters map area, register this
	$("canvas#levelmap").mousemove(function(e){
//      var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
//     $("div#tiledescription").text("( e.pageX, e.pageY ) - " + pageCoords + "\n" + "( e.clientX, e.clientY ) - " + clientCoords);
	$("div#tiledescription").text(utils.getTileOccupants(currentLevel, e.clientX, e.clientY));
	levelpainter.placeRect(currentLevel, e.clientX, e.clientY);
    });

	// TODO on mouse leaves map area, unregister that mousemove handler

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
	if(playerIsAlive == true) {
		Player.eachTurn(currentLevel);
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