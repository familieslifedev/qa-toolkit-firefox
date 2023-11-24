export function generateRandomFirstName(gender: string): string {
	let names: string[];

	switch (gender) {
		case "male":
			names = maleFirstNames;
			break;
		case "female":
			names = femaleFirstNames;
			break;
		case "any":
		default:
			names = maleFirstNames.concat(femaleFirstNames);
			break;
	}
	const randomIndex: number = Math.floor(Math.random() * names.length);
	return names[randomIndex];
}

export function generateRandomSurname(): string {
	const randomIndex: number = Math.floor(Math.random() * surnames.length);
	return surnames[randomIndex];
}

const femaleFirstNames: string[] = [
	"Sophie", "Emily", "Amelia", "Olivia", "Jessica", "Lucy", "Chloe", "Emma", "Mia", "Charlotte",
	"Grace", "Lily", "Ella", "Holly", "Eleanor", "Harriet", "Molly", "Rosie", "Georgia", "Eva",
	"Isla", "Hannah", "Alice", "Abigail", "Freya", "Phoebe", "Poppy", "Isabelle", "Daisy", "Layla",
	"Imogen", "Matilda", "Sienna", "Scarlett", "Megan", "Erin", "Maisie", "Amelie", "Zara", "Jasmine",
	"Ellie", "Annabelle", "Niamh", "Lexi", "Ava", "Lydia", "Martha", "Bella", "Maddison", "Leah",
	"Summer", "Mila", "Evelyn", "Gracie", "Florence", "Elsie", "Rosabella", "Lottie", "Anna", "Bethany",
	"Millie", "Elizabeth", "Poppy", "Evie", "Eliza", "Katie", "Tilly", "Aoife", "Rebecca", "Maisie",
	"Mabel", "Kiera", "Aria", "Heidi", "Olive", "Alisha", "Leila", "Lydia", "Pippa", "Sofia",
	"Felicity", "Delilah", "Esme", "Siobhan", "Megan", "Rosalie", "Skye", "Maya", "Ivy", "Willow",
	"Aurora", "Zoe", "Iris", "Ayla", "Maeve", "Aimee", "Harper", "Darcy", "Emilia", "Eden",
	"Clara", "Nina", "Lara", "Niamh", "Nell", "Edie", "Saskia", "Eva", "Lila", "Freya",
	"Elodie", "Marnie", "Mali", "Zainab", "Sophia", "Layla", "Hazel", "Nora", "Aaliyah", "Lena",
	"Martha", "Romy", "Asha", "Emilie", "Serena", "Lana", "Harriet", "Tara", "Elspeth", "Ines",
	"Sasha", "Jenna", "Alana", "Annie", "Dulcie", "Sia", "Elina", "Mya", "Ophelia", "Mira",
	"Avery", "Liliana", "Bryony", "Ingrid", "Leila", "Niamh", "Rosa", "Piper", "Heather", "Imani",
	"Gemma", "Kiana", "Sylvia", "Callie", "Livia", "Safiya", "Mina", "Soraya", "Leona", "Bianca",
	"Samara", "Esther", "Aurelia", "Zoey", "Astrid", "Thalia", "Miriam", "Iona", "Darcie", "Margo"
];

const maleFirstNames: string[] = [
	"Jack", "Oliver", "Harry", "George", "Noah", "Charlie", "Jacob", "William", "Thomas", "Joshua",
	"James", "Ethan", "Daniel", "Samuel", "Benjamin", "Joseph", "Henry", "Alexander", "Mason", "Leo",
	"Max", "Logan", "Lucas", "Oscar", "Matthew", "Adam", "David", "Ryan", "Isaac", "Dylan",
	"Nathan", "Liam", "Luke", "Andrew", "Sebastian", "Connor", "Cameron", "Theo", "Freddie", "Elijah",
	"Archie", "Arthur", "Michael", "Mohammed", "Reuben", "Finley", "Jaxon", "Ezra", "Aiden", "Harrison",
	"Jayden", "Alex", "Blake", "Zachary", "Tyler", "Gabriel", "Leon", "Toby", "Edward", "Louis",
	"Elliot", "Harvey", "Finn", "Jude", "Adam", "Aaron", "Ellis", "Kian", "Rory", "Luca",
	"Arthur", "Alfie", "Stanley", "Frankie", "Tommy", "Jenson", "Hugo", "Kai", "Miles", "Calvin",
	"Reggie", "Austin", "Robert", "Jesse", "Albert", "Grayson", "Dominic", "Joel", "Kieran", "Felix",
	"Levi", "Kaiden", "Seth", "Ralph", "Tristan", "Leonardo", "Eddie", "Ronnie", "Elliot", "Bobby",
	"Rex", "Abel", "River", "Phoenix", "Jax", "Otis", "Angus", "Eli", "Clayton", "Lincoln",
	"Maximus", "Orson", "Edwin", "Atticus", "Augustus", "Caspian", "Cohen", "Lachlan", "Ira", "Harlan",
	"Ansel", "Beau", "Enzo", "Emiliano", "Lorenzo", "Mateo", "Emanuel", "Rafael", "Nicolas", "Santiago",
	"Diego", "Javier", "Saul", "Leonel", "Andres", "Axel", "Gael", "Luka", "Joaquin", "Mario",
	"Eduardo", "Gustavo", "Sebastián", "Cristian", "Ariel", "Lionel", "Hector", "Jose", "Julio", "Maximiliano"
];

const surnames: string[] = [
	"Smith", "Jones", "Taylor", "Brown", "Williams", "Wilson", "Johnson", "Davies", "Robinson", "Wright",
	"Thompson", "White", "Walker", "Hall", "Green", "Lewis", "Harris", "Clarke", "Cooper", "Jackson",
	"Hill", "Morgan", "Hughes", "Edwards", "Turner", "Parker", "Collins", "Baker", "King", "Carter",
	"Mitchell", "Cook", "Adams", "Murphy", "Gray", "Campbell", "Stevens", "Wood", "Price", "Bell",
	"Bennett", "Young", "Allen", "Scott", "Khan", "Simpson", "Marshall", "Collins", "Hunt", "Ford",
	"Murray", "Pearson", "Wallace", "Foster", "Reynolds", "Stone", "Fletcher", "Gibson", "Cox", "Ellis",
	"Butler", "Cole", "West", "Mills", "Jordan", "Owen", "Grant", "Mcdonald", "Elliot", "Barnes",
	"Phillips", "Fraser", "Ferguson", "Lloyd", "Dixon", "Harvey", "Holmes", "Graham", "Kennedy", "Mason",
	"Fowler", "Reid", "Mccarthy", "Pearce", "Hopkins", "Morrison", "Chapman", "Hunter", "Black", "Hawkins",
	"Spencer", "Harrison", "Gilbert", "Bates", "Jenkins", "Lee", "Hart", "Webb", "O'Brien", "Burke",
	"Lowe", "May", "Sullivan", "Peacock", "Booth", "Payne", "Nelson", "Barker", "Lynch", "Fleming",
	"Johnston", "Bishop", "Fuller", "Howard", "Hayes", "Burton", "Fitzgerald", "Rees", "Moss", "Mckay",
	"Miles", "Wheeler", "Riley", "Coleman", "Atkinson", "Smart", "Perry", "Henderson", "Jennings", "Bradley",
	"Stewart", "Hancock", "Becker", "Manning", "Shaw", "Lambert", "Wade", "Churchill", "Goodwin", "O'Neill",
	"Cunningham", "Richardson", "Higgins", "Grant", "Knight", "Duncan", "Reid", "Gardner", "Fisher", "Hodges",
	"Cooke", "Osborne", "Paterson", "Todd", "Christie", "Sutherland", "Horton", "Davidson", "Macdonald", "Sinclair",
	"Cameron", "Mcgregor", "Kerr", "Stanton", "Maclean", "Mcintosh", "Hendry", "Macmillan", "Kirk", "Gibbons",
	"Chadwick", "Hume", "Muir", "Ramsay", "Archer", "Mcintyre", "Kaur", "Gill", "Gupta", "Patel", "Singh", "Chauhan",
	"Pandey", "Kumar", "Sharma", "Shah", "Bhatia", "Chowdhury", "Sinha", "Chakraborty", "Saxena", "Sarkar",
	"Khan", "Ali", "Ahmed", "Khattak", "Hussain", "Hussaini", "Hassan", "Mohammed", "Saleem", "Rehman", "Mirza",
	"Abbasi", "Raza", "Kamal", "Kazmi", "Memon", "Shaikh", "Malik", "Akhtar", "Farooq", "Awan", "Baig", "Bashir",
	"Chaudhry", "Dogar", "Javed", "Khokhar", "Nadeem", "Nazir", "Qureshi", "Tariq", "Waseem", "Gillani",
	"Hameed", "Iqbal", "Mahmood", "Rashid", "Saeed", "Sattar", "Usman", "Younas", "Zaman", "Zia",
	"Bhatti", "Farooqi", "Haidar", "Hashmi", "Ilyas", "Jamil", "Khalid", "Mahmood", "Malik", "Masood",
	"Qamar", "Qureshi", "Saeed", "Saleh", "Siddiqui", "Subhani", "Warsi", "Zaidi", "Afridi", "Ali",
	"Bukhari", "Ghaffar", "Haider", "Hassan", "Khan", "Lone", "Mir", "Nawaz", "Rahman", "Rasool",
	"Sadiq", "Sarfraz", "Sultan", "Wadood", "Zaman", "Zubair", "Cox", "Evans", "Hartley", "Martin",
	"Kemp", "Ross", "Barnes", "Bennett", "Bolton", "Bryant", "Cameron", "Carr", "Chandler", "Chappell",
	"Clements", "Cooke", "Cooper", "Crawford", "Dawson", "Dunn", "Ellis", "Fitzpatrick", "Foster", "Francis",
	"Gardiner", "Gibbs", "Gibson", "Gough", "Graham", "Gray", "Hancock", "Hanson", "Harper", "Hawkins",
	"Haynes", "Henderson", "Hewitt", "Hickman", "Hicks", "Higgins", "Holland", "Horton", "Howell", "Hudson",
	"Humphries", "Hunt", "Hunter", "Jackson", "Jeffery", "Jenkins", "Johns", "Johnston", "Jones", "Kelly",
	"Kenny", "Kerr", "Knight", "Lamb", "Lambert", "Lawrence", "Lawson", "Lee", "Lees", "Lloyd",
	"Long", "Lowe", "Lyons"
];
