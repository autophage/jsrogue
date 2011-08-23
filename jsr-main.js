var mapWidth = 90;
var mapHeight = 30;

function initGame() {
	
	var testLevel = levelmaker.generateLevel(20);
	turn = 0;
	
	domutils.prepareLevel(testLevel);

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

window.addEventListener("load", initGame, false);