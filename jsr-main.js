var mapWidth = 90;
var mapHeight = 30;

function initGame() {
	
	var testLevel = levelmaker.generateLevel(20);
	
	domutils.prepareLevel(testLevel);

}

window.addEventListener("load", initGame, false);