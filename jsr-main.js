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
	
	var testLevel = levelmaker.generateLevel(20);
	
	domutils.prepareLevel(testLevel);

}



window.addEventListener("load", initGame, false);