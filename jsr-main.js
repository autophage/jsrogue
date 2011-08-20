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
	
	levelmaker.generateLevel(20);
	
	domutils.prepareLevel();
	
	domutils.updateMap();

}



window.addEventListener("load", initGame, false);