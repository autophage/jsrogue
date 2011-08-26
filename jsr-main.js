var mapWidth = 60;
var mapHeight = 30;

function initGame() {
	
	currentLevel = levelmaker.generateLevel(20);
	turn = 0;
	
	domutils.prepareLevel(currentLevel);

}

function doATurn() {
	for(a in currentLevel.actors) {
		try {
			currentLevel.actors[a].eachTurn(currentLevel);
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