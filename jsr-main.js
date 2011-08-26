var mapWidth = 60;
var mapHeight = 30;

function initGame() {
	
	currentLevel = levelmaker.generateLevel(20);
	turn = 0;
	
	domutils.prepareLevel(currentLevel);

}

function gameTurn() {
	turn++;
	for(var a in actorsExisting) {
		try {
			a.eachTurn();
		} catch (e) {
			console.log(a + " does not do anything this turn.");
		}
	}
}

function doATurn() {
	for(a in currentLevel.actors) {
		currentLevel.actors[a].eachTurn();
	}
}

function addACreature() {
	var toAdd = new CreatureProto();
	toAdd.setInitialPosition(Math.floor(Math.random()*mapWidth), Math.floor(Math.random()*mapHeight));
	currentLevel.actors.push(toAdd);
}

window.addEventListener("load", initGame, false);