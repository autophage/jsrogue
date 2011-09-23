var items = {

	list: [	

		{
			article: "a",
			name: "sword",
			baseValue: 10,
			baseWeight: 10,
			baseDamage: 5,
			baseArmor: 2,
			display: "#",
			material: materials[0],
			image: "./assets/images/sprites/items/sword.png"
		},
		
		{
			article: "a",
			name: "shield",
			baseValue: 8,
			baseWeight: 8,
			baseDamage: 3,
			baseArmor: 8,
			display: "#",
			material: materials[0],
			image: "./assets/images/sprites/items/shield.png"
		},
		
		{
			article: "a",
			name: "biscuit",
			baseValue: 1,
			baseWeight: 0.5,
			baseDamage: 0.1,
			baseArmor: 0,
			display: "%",
			material: materials[0],
			image: "./assets/images/sprites/items/biscuit.png"
		},
		
		{
			article: "a",
			name: "mace",
			baseValue: 12,
			baseWeight: 15,
			baseDamage: 6,
			baseArmor: .1,
			display: "#",
			material: materials[0],
			image: "./assets/images/sprites/items/mace.png"
		},
		
		{
			article: "a",
			name: "buckler",
			baseValue: 5.5,
			baseWeight: 5,
			baseDamage: 1,
			baseArmor: 5.5,
			display: "#",
			material: materials[0],
			image: "./assets/images/sprites/items/buckler.png"
		},
		
		{
			article: "a",
			name: "lump",
			baseValue: 1.0,
			baseWeight: 1,
			baseDamage: 0.2,
			baseArmor: 0.2,
			material: materials[0],
			image: "./assets/images/sprites/items/lump.png"
		},
		
		{
			article: "a",
			name: "pickaxe",
			baseValue: 4.5,
			baseWeight: 3,
			baseDamage: 3,
			baseArmor: 1,
			material: materials[0],
			image: "./assets/images/sprites/items/pickaxe.png"
		}
	],
	
	scenery: []

};

items.scenery[0] =	{
		article: "the",
		name: "floor",
		material: materials[14],
		display: ".",
		image: "./assets/images/tiles/floor.png"
	};

items.scenery[1] = 	{
		article: "a",
		name: "wall",
		material: materials[14],
		display: ".",
		image: "./assets/images/tiles/wall.png"
	};

// TODO use 'depth' to be more likely to return items made of something expensive the lower the player is
// TODO Make sure that things are made of things that they'd likely be made of, so we don't get oak biscuits and such
items.getRandomItem = function(depth) {
	var indexToReturn = Math.floor(Math.random()*items.list.length);
	var itemToReturn = {}
	
	for (var name in items.list[indexToReturn]) {
		if (items.list[indexToReturn].hasOwnProperty(name)) {
			itemToReturn[name] = items.list[indexToReturn][name];
		}
	}
	
	itemToReturn.material = materials[Math.floor(Math.random()*(materials.length-1))+1];
	
	return itemToReturn;
}