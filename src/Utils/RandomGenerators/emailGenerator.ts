

export function generateRandomEmail(firstName: string | null, surname: string | null) {
	console.log(firstName + surname);
	const randomDomain = domains[Math.floor(Math.random() * domains.length)];
	let randomNumber = Math.floor(Math.random() * 1000);
	if (firstName && surname) {
		console.log(firstName + surname);
		return (`${firstName}.${surname}${randomNumber}${randomDomain}`);
	}
	else {
		const randomEmail = emailAddresses[Math.floor(Math.random() * emailAddresses.length)];
		return randomEmail + randomDomain;
	}
}



// Arrays

const domains: string[] = [
	"@gmail.com",
	"@yahoo.com",
	"@hotmail.com",
	"@aol.com",
	"@outlook.com",
	"@icloud.com",
	"@protonmail.com",
	"@mail.com",
	"@zoho.com",
	"@yandex.com",
	"@gmx.com",
	"@mail.ru",
	"@fastmail.com",
	"@tutanota.com",
	"@pm.me",
	"@me.com",
	"@live.com",
	"@inbox.com",
	"@hushmail.com",
	"@rocketmail.com",
];

const emailAddresses = [
	"fireball88", "dragonqueen97", "sneaky_ninja", "dark_knight42", "cyber_punk",
	"daring_adventurer", "king_of_the_world", "space_cadet", "game_over_9000", "rocketman88",
	"the_real_slim_shady", "silent_killer", "mystic_mage", "rampaging_rhino", "thunderbolt_99",
	"captain_courageous", "the_last_samurai", "legendary_warrior", "shadow_hunter", "mighty_hercules",
	"ruthless_pirate", "flying_dragon", "time_traveler", "iron_fist", "galactic_ruler",
	"wise_guru", "virtual_ninja", "digital_samurai", "stealthy_spy", "sky_walker",
	"lone_wolf", "mad_scientist", "mighty_thor", "the_one_ring", "black_knight",
	"steel_samurai", "unstoppable_force", "immovable_object", "the_incredible_hulk", "web_wonder",
	"neon_ninja", "electric_warrior", "biohazard_101", "storm_chaser", "space_invader",
	"zombie_slayer", "fire_fighter", "speedy_gonzales", "sonic_boom", "diamond_dust",
	"blaze_fire", "thunder_strike", "water_walker", "earth_shaker", "air_bender",
	"nebula_navigator", "interstellar_pilot", "neon_navigator", "digital_dragon", "cyber_samurai",
	"galactic_guardian", "cosmic_crusader", "planet_protector", "virtual_voyager", "time_traveler",
	"dimension_diver", "fantasy_fighter", "legendary_lion", "mythical_mermaid", "pirate_princess",
	"robot_ranger", "super_sleuth", "space_explorer", "tech_titan", "atomic_angel",
	"lunar_lander", "meteor_masher", "neon_nerd", "cyber_commander", "galactic_gladiator",
	"fantasy_fanatic", "legendary_lord", "mythical_monster", "pirate_power", "robot_rider",
	"super_science", "space_spectator", "tech_triumph", "atomic_architect", "lunar_loner",
	"meteor_master", "neon_navigator", "cyber_champion", "galactic_guru", "fantasy_fan",
	"legendary_lady", "mythical_mage", "pirate_pro", "robot_rebel", "super_student",
	"space_surfer", "tech_trendsetter", "atomic_artist", "lunar_librarian", "meteor_miner",
	"neon_nightmare", "cyber_celebrity", "galactic_grandmaster"
];


