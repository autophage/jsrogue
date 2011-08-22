var items = {

	list: [	

		{
			name: "sword",
			baseValue: 10,
			baseWeight: 10,
			baseDamage: 5,
			baseArmor: 2,
			display: "#",
			material: materials[0]
		},
		
		{
			name: "shield",
			baseValue: 8,
			baseWeight: 8,
			baseDamage: 3,
			baseArmor: 8,
			display: "#",
			material: materials[0]
		},
		
		{
			name: "biscuit",
			baseValue: 1,
			baseWeight: 0.5,
			baseDamage: 0.1,
			baseArmor: 0,
			display: "%",
			material: materials[0]
		},
		
		{
			name: "mace",
			baseValue: 12,
			baseWeight: 15,
			baseDamage: 6,
			baseArmor: .1,
			display: "#",
			material: materials[0]
		},
	]
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