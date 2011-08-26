creatureProto = {
	article: "a",
	name: "Primordial Creature",
	image: "./assets/images/sprites/creatures/primordial_creature.png",
	limbs: {
		body: {
			maxHits: 10,
			currentHits: 10,
			baseWeight: 50
		}
	},
	
	position: {
		x: -1,
		y: -1
	},
	
	currentIndex: 0,
	
	material: materials[13],
	
	eachTurn: function() {
		currentLevel[this.position.x][this.position.y].occupants.pop();
		var shiftX = Math.floor(Math.random() * 3) - 1;
		var shiftY = Math.floor(Math.random() * 3) - 1;
		this.position.x += shiftX;
		this.position.y += shiftY;
		this.currentIndex = currentLevel[this.position.x][this.position.y].occupants.length;
		currentLevel[this.position.x][this.position.y].occupants.push(this);
		domutils.updateDOM(this.position.x, this.position.y);
		console.log(this.article + ' ' + this.name + ' is now located at ' + this.position.x + ', ' + this.position.y + '.');
	}
}