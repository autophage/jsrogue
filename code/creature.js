creatureProto = {
	article: "a",
	name: "Primordial Creature",
	display: "C",
	limbs: {
		body: {
			maxHits: 10,
			currentHits: 10,
			baseWeight: 50
		}
	},
	
	position: {
		x: 0,
		y: 0
	},
	
	eachTurn: function() {
		var direction = utils.pickADirectionAtRandom();
		utils.translate(this, direction);
	}
}