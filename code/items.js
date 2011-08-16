/*
 * Most of these should be pretty obvious.  However, a few notes:
 * 	- wearOrWieldKey has the following values:
 * 		0: Can be neither worn nor wielded
 * 		1: Can be wielded in one hand
 * 		2: Can be wielded, but requires both hands
 * 		3: shirt, etc  - Can be worn on the body (shirt-style)
 * 		4: cloak, etc  - Can be worn on the body (cloak-style)
 * 		5: bracer, etc - Can be worn on an arm
 * 		6: greave, etc - Can be worn on a leg
 * 		7: boot, etc   - Can be worn on a foot
 * 		8: hat, etc    - Can be worn on the head
 * 		9: ring, etc   - Can be worn on the fingers (to a max of 5 per hand)
 */
var items = [
	{
		itemKey: 0,
		name: "nothingness",
		material: 0,
		baseValue: 100,
		baseWeight: 0,
		baseDamage: 100,
		baseArmor: 100,
		wearOrWieldKey: 5
	},
	
	{
		itemKey: 0,
		name: "nothingness",
		material: 0,
		baseValue: 100,
		baseWeight: 0,
		baseDamage: 100,
		baseArmor: 100,
		wearOrWieldKey: 5
	},
	
	{
		itemKey: 1,
		name: "sword",
		material: 0,
		baseValue: 10,
		baseWeight: 10,
		baseDamage: 5,
		baseArmor: 2,
		wearOrWieldKey: 1
	},
	
	{
		itemKey: 2,
		name: "shield",
		material: 0,
		baseValue: 8,
		baseWeight: 8,
		baseDamage: 3,
		baseArmor: 8,
		wearOrWieldKey: 1
	},
	
	{
		itemKey: 3,
		name: "biscuit",
		material: 0,
		baseValue: 1,
		baseWeight: 0.5,
		baseDamage: 0.1,
		baseArmor: 0,
		wearOrWieldKey: 0
	},
	
	
];
