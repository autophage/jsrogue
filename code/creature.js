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
		
		inventory: [],
		
		setInitialPosition: function(x, y, level) {
			this.position.x = x;
			this.position.y = y;
			level[x][y].occupants.push(this);
			domutils.updateDOM(x, y, level);
		},
		
		eachTurn: function(level) {
			var x = this.position.x;
			var y = this.position.y;
			var oldScenery = level[x][y].occupants[0];
			level[x][y].occupants.pop();
			level[x][y].occupants[0] = oldScenery;
			domutils.updateDOM(x, y, level);
			var shiftX = Math.floor(Math.random() * 3) - 1;
			var shiftY = Math.floor(Math.random() * 3) - 1;
			var testPosition = {};
			testPosition.x = this.position.x + shiftX;
			testPosition.y = this.position.y + shiftY;
			if(level[testPosition.x][testPosition.y].occupants[0] == items.scenery[1]) {
				return;
			}
			this.position.x += shiftX;
			this.position.y += shiftY;
			var x = this.position.x;
			var y = this.position.y;
			level[x][y].occupants.push(this);
			domutils.updateDOM(x, y, level);
			console.log(this.article + ' ' + this.name + ' is now located at ' + this.position.x + ', ' + this.position.y + '.');
		}
	}
}