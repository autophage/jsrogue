function CreatureProto() {
	return {
		article: "a",
		name: "Primordial Creature",
		image: "./assets/images/sprites/creatures/primordial_creature.png",
		behaviorCounter: 0,
		currentBehavior: 1,
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
		},
		
		eachTurn: function(level) {
			
			this.shiftX = 0;
			this.shiftY = 0;

			if(this.behaviorCounter == 0) {
				this.currentBehavior = Math.floor(Math.random()*3);
				this.behaviorCounter = Math.floor(Math.random()*15);
			}
			
			var x = this.position.x;
			var y = this.position.y;
			
			if(this.currentBehavior == 0) {
				console.log('chasing player!');
				if(player.position.x < x) {
					this.shiftX = -1;
				} else if(player.position.x > x) {
					this.shiftX = 1;
				} else {
					this.shiftX = 0;
				}
				
				if(player.position.y < y) {
					this.shiftY = -1;
				} else if(player.position.y > y) {
					this.shiftY = 1;
				} else {
					this.shiftY = 0;
				}
			}
			
			if(this.currentBehavior == 1) {
				console.log('moving at random!');
				this.shiftX = Math.floor(Math.random() * 3) - 1;
				this.shiftY = Math.floor(Math.random() * 3) - 1;
			}
	
			if(this.currentBehavior == 2) {
				console.log('running from player!');
				if(player.position.x > x) {
						this.shiftX = -1;
					} else if(player.position.x < x) {
						this.shiftX = 1;
					} else {
						this.shiftX = 0;
					}
					
				if(player.position.y > y) {
						this.shiftY = -1;
					} else if(player.position.y < y) {
						this.shiftY = 1;
					} else {
						this.shiftY = 0;
					}
			}
			
			if(utils.moveIsValid(currentLevel, x+this.shiftX, y+this.shiftY)) {
				level[x][y].occupants.pop();
				level[x+this.shiftX][y+this.shiftY].occupants.push(this);
				this.position.x = x+this.shiftX;
				this.position.y = y+this.shiftY;
			}
			
			this.behaviorCounter--;
		}
	}
}

function Player() {
	return {
		name: "Hardcoded Playername",
		image: "./assets/images/sprites/creatures/player.png",
		limbs: {
			body: {
				maxHits: 10,
				currentHits: 10,
				baseWeight: 50
			},
			leftLeg: {
				maxHits: 5,
				currentHits: 5,
				baseWeight: 20
			},
			rightLeg: {
				maxHits: 5,
				currentHits: 5,
				baseWeight: 20
			},
			head: {
				maxHits: 3,
				currentHits: 3,
				baseWeight: 5
			},
			leftArm: {
				maxHits: 4,
				currentHits: 4,
				baseWeight: 12
			},
			rightArm: {
				maxHits: 4,
				currentHits: 4,
				baseWeight: 12
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
		},
		
		move: function(dir, level) {
			
			var x = this.position.x;
			var y = this.position.y;
			
			var occupantIndex = utils.getIndexOf(level[x][y].occupants, player);
			console.log("  occupantIndex of player was " + occupantIndex);
			level[x][y].occupants.splice(occupantIndex, 1);
			
			switch(dir) {
				case WAIT:
					break;
				case NORTH:
					if(utils.moveIsValid(currentLevel, x, y-1)) {
						this.position.y -= 1;
					} else {
						if(DIGGING&&(y-1)>0) {
							currentLevel[x][y-1].isPassable = true;
							console.log("You dig.");
						}
					DIGGING = false;
					}
					break;
				case NORTHEAST:
					if(utils.moveIsValid(currentLevel, x+1, y-1)) {
						this.position.x += 1;
						this.position.y -= 1;
					} else {
						console.log("Invalid move.");
					}
					DIGGING = false;
					break;
				case EAST:
					if(utils.moveIsValid(currentLevel, x+1, y)) {
						this.position.x += 1;
					} else {
						if(DIGGING&&(x+1)<59) {
							currentLevel[x+1][y].isPassable = true;
							console.log("You dig.");
						}
					}
					DIGGING = false;
					break;
				case SOUTHEAST:
					if(utils.moveIsValid(currentLevel, x+1, y+1)) {
						this.position.x += 1;
						this.position.y += 1;
					} else {
						console.log("Invalid move.");
					}
					DIGGING = false;
					break;
				case SOUTH:
					if(utils.moveIsValid(currentLevel, x, y+1)) {
						this.position.y += 1;
					} else {
						if(DIGGING&&(y+1)<29) {
							currentLevel[x][y+1].isPassable = true;
							console.log("You dig.");
						}
					}
					DIGGING = false;
					break;
				case SOUTHWEST:
					if(utils.moveIsValid(currentLevel, x-1, y+1)) {
						this.position.y += 1;
						this.position.x -= 1;
					} else {
						console.log("Invalid move.");
					}
					DIGGING = false;
					break;
				case WEST:
					if(utils.moveIsValid(currentLevel, x-1, y)) {
						this.position.x -= 1;
					} else {
						if(DIGGING&&(x-1)>0) {
							currentLevel[x-1][y].isPassable = true;
							console.log("You dig.");
						}
					}
					DIGGING = false;
					break;
				case NORTHWEST:
					if(utils.moveIsValid(currentLevel, x-1, y-1)) {
						this.position.x -= 1;
						this.position.y -= 1;
					} else {
						console.log("Invalid move.");
					}
					DIGGING = false;
					break;
			};
			
			this.dropItem = function(item) {
				var itemBeingDropped = this.inventory[item];
				this.inventory.splice(item, 1);
				currentLevel[this.position.x][this.position.y].occupants.push(itemBeingDropped);
			}
			
			var x = this.position.x;
			var y = this.position.y;
			level[x][y].occupants.push(this);
			console.log(this.article + ' ' + this.name + ' is now located at ' + this.position.x + ', ' + this.position.y + '.');
		}
		
	}
}