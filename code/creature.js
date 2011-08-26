function CreatureProto() {
	return {
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
		
		setInitialPosition: function(x, y) {
			this.position.x = x;
			this.position.y = y;
			currentLevel[x][y].occupants.push(this);
			domutils.updateDOM(x, y);
		},
		
		eachTurn: function() {
			var x = this.position.x;
			var y = this.position.y;
			currentLevel[x][y].occupants.pop();
			domutils.updateDOM(x, y);
			var shiftX = Math.floor(Math.random() * 3) - 1;
			var shiftY = Math.floor(Math.random() * 3) - 1;
			this.position.x += shiftX;
			this.position.y += shiftY;
			var x = this.position.x;
			var y = this.position.y;
			this.currentIndex = currentLevel[x][y].occupants.length;
			currentLevel[x][y].occupants.push(this);
			domutils.updateDOM(x, y);
			console.log(this.article + ' ' + this.name + ' is now located at ' + this.position.x + ', ' + this.position.y + '.');
		}
	}
}