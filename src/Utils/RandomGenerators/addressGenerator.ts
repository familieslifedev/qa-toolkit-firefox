export function generateHouseNumber():string{
	const houseNumber = 1+ Math.floor(Math.random() * 200);
	return String(houseNumber);
}

export function generatePostcode():string{
	return ukPostcodes[Math.floor(Math.random() * ukPostcodes.length)];
}

export function generateCounty():string{
	return ukCounties[Math.floor(Math.random() * ukCounties.length)];
}

export function generateStreetName():string{
	const randomStreetPrefix = ukStreetPrefixes[Math.floor(Math.random() * ukStreetPrefixes.length)];
	const randomStreetSuffix = ukStreetSuffixes[Math.floor(Math.random() * ukStreetSuffixes.length)];
	return `${randomStreetPrefix} ${randomStreetSuffix}`;
}

export function generateRandomVillage():string{
	return ukVillages[Math.floor(Math.random() * ukVillages.length)];
}
export function generateZipcode(): string {
	return Math.floor(Math.random() * 100000).toString().padStart(5, "0");
}
export function generateTown():string{
	return ukTowns[Math.floor(Math.random() * ukTowns.length)];
}

export function generateUsState(): string {
	return usStates[Math.floor(Math.random() * usStates.length)];
}

export function generateUsCity(): string {
	return usCities[Math.floor(Math.random() * usCities.length)];
}

const ukCounties: string[] = [
	"Aberdeenshire", "Angus", "Argyllshire", "Ayrshire", "Banffshire", "Bedfordshire",
	"Berkshire", "Berwickshire", "Buckinghamshire", "Caithness", "Cambridgeshire",
	"Cheshire", "Clackmannanshire", "Cornwall", "Cromartyshire", "Cumberland", "Cumbria",
	"Denbighshire", "Derbyshire", "Devon", "Dorset", "Dumfriesshire", "Dunbartonshire",
	"Durham", "East Lothian", "Essex", "Fife", "Flintshire", "Glamorgan",
	"Gloucestershire", "Hampshire", "Herefordshire", "Hertfordshire", "Inverness-shire",
	"Isle of Wight", "Kent", "Kincardineshire", "Kinross-shire", "Kirkcudbrightshire",
	"Lanarkshire", "Lancashire", "Leicestershire", "Lincolnshire", "London", "Merioneth",
	"Merseyside", "Midlothian", "Monmouthshire", "Montgomeryshire", "Morayshire",
	"Nairnshire", "Norfolk", "Northamptonshire", "Northumberland", "Nottinghamshire",
	"Orkney", "Oxfordshire", "Peeblesshire", "Pembrokeshire", "Perthshire", "Radnorshire",
	"Renfrewshire", "Ross-shire", "Roxburghshire", "Rutland", "Selkirkshire", "Shetland",
	"Shropshire", "Somerset", "Staffordshire", "Stirlingshire", "Suffolk", "Surrey",
	"Sussex", "Sutherland", "Tyne and Wear", "Warwickshire", "West Lothian",
	"West Midlands", "Westmorland", "Wigtownshire", "Wiltshire", "Worcestershire",
	"Yorkshire"
];

const ukStreetSuffixes: string[] = [
	"Avenue", "Boulevard", "Close", "Crescent", "Drive", "Gardens", "Gate", "Grove",
	"Hill", "Lane", "Mews", "Park", "Place", "Road", "Row", "Square", "Street",
	"Terrace", "Walk", "Way", "Alley", "Arcade", "Circle", "Court", "Hillside",
	"Lodge", "Path", "Pathway", "Passage", "Place", "Ridge", "Rise", "Stairs",
	"Trail", "Villas", "Wharf", "Yard", "Abbey", "Bank", "Bar", "Barn", "Bridge",
	"Camp", "Castle", "Center", "Chase", "Church", "Corner", "Crossing", "Depot",
	"Docks", "Factory", "Field", "Forest", "Forge", "Foundry", "Gardens", "Harbor",
	"Haven", "Heights", "Junction", "Knoll", "Landing", "Market", "Mill", "Orchard",
	"Palace", "Parade", "Pass", "Plantation", "Plaza", "Port", "Promenade", "Quay",
	"Reserve", "Riverside", "Shore", "Siding", "Spur", "Station", "Subdivision",
	"Summit", "Terrace", "Track", "Turnpike", "Vale", "Viaduct", "View", "Village",
	"Vineyard", "Woods"
];

const ukStreetPrefixes: string[] = [
	"High", "Baker", "King", "Queen", "Market", "Church", "Main", "Park", "Green",
	"Mill", "Bridge", "Orchard", "Sycamore", "Elm", "Willow", "Oak", "Chestnut",
	"Maple", "Grove", "Hill", "Meadow", "Walnut", "Cherry", "Pine", "Cedar",
	"Aspen", "Birch", "Holly", "Magnolia", "Spring", "Summer", "Autumn", "Winter",
	"Sunset", "Dawn", "Dusk", "Riverside", "Lakeside", "Water", "Canal", "Garden",
	"Heath", "Forest", "Woodland", "Paddock", "Fern", "Moor", "Valley", "Coast",
	"Cliff", "Harbor", "Beach", "Marina", "Cove", "Bay", "Seaside", "Ocean", "Sea",
	"Wave", "Coral", "Pearl", "Anchor", "Sail", "Mermaid", "Lighthouse", "Compass",
	"Explorer", "Voyage", "Discovery", "Adventure", "Pioneer", "Heritage", "Legacy",
	"Victory", "Liberty", "Freedom", "Peace", "Hope", "Dream", "Love", "Harmony",
	"Unity", "Tranquility", "Serenity", "Prosperity", "Felicity", "Happiness", "Joy",
	"Bliss", "Grace", "Elegance"
];

const ukTowns: string[] = [
	"Aberdeen", "Armagh", "Bangor", "Bath", "Belfast", "Birmingham", "Blackburn",
	"Blackpool", "Bolton", "Bournemouth", "Bradford", "Brighton", "Bristol", "Cambridge",
	"Canterbury", "Cardiff", "Carlisle", "Chelmsford", "Cheltenham", "Chester",
	"Chichester", "Coventry", "Crawley", "Croydon", "Darlington", "Derby", "Derry",
	"Doncaster", "Dover", "Dundee", "Durham", "Eastbourne", "Edinburgh", "Ely",
	"Exeter", "Falmouth", "Gateshead", "Glasgow", "Gloucester", "Grimsby", "Guildford",
	"Halifax", "Harrow", "Hastings", "Hemel Hempstead", "Hereford", "Huddersfield",
	"Hull", "Inverness", "Ipswich", "Islington", "Kensington", "Kettering",
	"Kingston upon Thames", "Lancaster", "Leeds", "Leicester", "Lichfield", "Lincoln",
	"Lisburn", "Liverpool", "Londonderry", "London", "Luton", "Manchester",
	"Middlesbrough", "Milton Keynes", "Newcastle upon Tyne", "Newport", "Newry",
	"Northampton", "Norwich", "Nottingham", "Oxford", "Paisley", "Penzance", "Perth",
	"Peterborough", "Plymouth", "Poole", "Portsmouth", "Preston", "Reading", "Redditch",
	"Ripon", "Rochdale", "Rotherham", "Salford", "Salisbury", "Scarborough", "Scunthorpe",
	"Sheffield", "Shrewsbury", "Slough", "Solihull", "Southampton", "Southend-on-Sea",
	"Southport", "St Albans", "St Asaph", "St Davids", "Stirling", "Stoke-on-Trent",
	"Sunderland", "Sutton Coldfield", "Swansea", "Swindon", "Taunton", "Telford",
	"Torquay", "Truro", "Wakefield", "Walsall", "Warrington", "Warwick", "Watford",
	"Wells", "Westminster", "Weymouth", "Wigan", "Winchester", "Windsor",
	"Wolverhampton", "Worcester", "Worthing", "York"
];

const ukVillages: string[] = [
	"Aberlady",	"Aldbourne","Alfriston","Amberley",	"Ashford-in-the-Water",
	"Askrigg", "Avebury", "Bamburgh", "Barningham",	"Beaulieu",	"Berrynarbor",
	"Bibury", "Birlingham",	"Blanchland", "Blockley", "Bourton-on-the-Water",
	"Branscombe", "Bray", "Broadway", "Brook", "Buckler's Hard", "Burley",
	"Burnsall",	"Cadgwith",	"Cartmel", "Castle Acre", "Castle Combe", "Cawdor",
	"Chagford",	"Chilham", "Chipping Campden", "Clare",	"Clovelly",	"Corfe Castle",
	"Cromford",	"Crosby Ravensworth", "Crowcombe", "Culross", "Dedham",
	"Dorchester-on-Thames",	"Dovedale",	"Downham", "Easington",	"Easwald",
	"Edensor", "Egton",	"Elterwater", "Eltisley", "Eynsford", "Falkland",
	"Farningham", "Fowey", "Framlingham", "Gargrave", "Grasmere", "Great Tew",
	"Hambledon", "Hawkshead", "Hayfield", "Helford", "Helmsley", "Hovingham",
	"Ilmington", "Ingleton", "Kettlewell", "Kingsand", "Lacock", "Lavenham",
	"Long Melford", "Lower Slaughter", "Luss", "Mells", "Mersea Island",
	"Milton Abbas", "Mousehole", "Newton-in-Bowland", "Orford", "Pembridge",
	"Plockton", "Polperro", "Porlock", "Port Isaac", "Portmeirion", "Prestbury",
	"Ravenglass", "Reeth", "Rye", "Sennen", "Shere", "Shipton-under-Wychwood",
	"Skipton", "Slaidburn", "Snowshill", "Staithes", "Stow-on-the-Wold",
	"Stratford-upon-Avon", "Tetbury", "Thaxted", "Tobermory", "Tissington",
	"Ullapool", "Upper Slaughter", "Warkworth", "Wells-next-the-Sea", "Westerham",
	"Willingham"
];

export const usStates: string[] = [
	"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
	"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
	"Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
	"Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
	"New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
	"Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
	"Utah", "Vermont", "Virginia", "Washington","West Virginia", "Wisconsin", "Wyoming"
]

const usCities: string[] = [
	"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio",
	"San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus",
	"San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington", "Boston",
	"Nashville", "El Paso", "Detroit", "Memphis", "Portland", "Oklahoma City", "Las Vegas",
	"Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa",
	"Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Miami", "Raleigh",
	"Omaha", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Wichita",
	"New Orleans", "Arlington", "Tampa", "Honolulu", "Aurora", "Anaheim", "Santa Ana",
	"St. Louis", "Riverside", "Corpus Christi", "Lexington", "Pittsburgh", "Anchorage",
	"Stockton", "Cincinnati", "St. Paul", "Toledo", "Greensboro", "Newark", "Plano",
	"Henderson", "Lincoln", "Buffalo", "Jersey City", "Chula Vista", "Fort Wayne", "Orlando",
	"St. Petersburg", "Chandler", "Laredo", "Norfolk", "Durham", "Madison", "Lubbock",
	"Irvine", "Winston-Salem", "Glendale", "Garland", "Hialeah", "Reno", "Chesapeake",
	"Gilbert", "Baton Rouge", "Irving", "Scottsdale", "North Las Vegas", "Fremont",
	"Boise City", "Richmond", "San Bernardino", "Birmingham", "Spokane", "Rochester",
	"Des Moines", "Modesto", "Fayetteville", "Tacoma", "Oxnard", "Fontana", "Columbus",
	"Montgomery", "Moreno Valley", "Shreveport", "Aurora", "Yonkers", "Akron",
	"Huntington Beach", "Little Rock", "Augusta", "Amarillo", "Glendale", "Mobile",
	"Grand Rapids", "Salt Lake City", "Tallahassee", "Huntsville", "Grand Prairie",
	"Knoxville", "Worcester", "Newport News", "Brownsville", "Overland Park", "Santa Clarita",
	"Providence", "Garden Grove", "Chattanooga", "Oceanside", "Jackson", "Fort Lauderdale",
	"Santa Rosa", "Rancho Cucamonga", "Port St. Lucie", "Tempe", "Ontario", "Vancouver",
	"Cape Coral", "Sioux Falls", "Springfield", "Peoria", "Pembroke Pines", "Elk Grove",
	"Salem", "Lancaster", "Corona", "Eugene", "Palmdale", "Salinas", "Springfield",
	"Pasadena", "Fort Collins", "Hayward", "Pomona", "Cary", "Rockford", "Alexandria",
	"Escondido", "Sunnyvale", "Lakewood", "Kansas City", "Hollywood", "Clarksville",
	"Torrance", "Rockford", "Joliet", "Paterson", "Bridgeport", "Naperville", "Savannah",
	"Mesquite", "Syracuse", "Pasadena", "Orange", "Fullerton", "Killeen", "Dayton", "McAllen",
	"Bellevue", "Miramar", "Hampton", "West Valley City", "Warren", "Olathe", "Columbia"
]

const ukPostcodes: string[] = [
	// London postcodes
	'EC1A 1BB', 'WC2H 7LT', 'NW1 6XE', 'SE1 9SG',
	// Birmingham postcodes
	'B1 1TF', 'B12 9LP', 'B21 9RJ',
	// Manchester postcodes
	'M1 2AP', 'M15 4PZ', 'M32 0JG',
	// Glasgow postcodes
	'G1 2FF', 'G12 8QQ', 'G31 2UX',
	// Sheffield postcodes
	'S1 2AX', 'S10 2PD', 'S36 4GF',
	// Bristol postcodes
	'BS1 5UH', 'BS8 1QU', 'BS16 1GW',
	// Leeds postcodes
	'LS1 3AJ', 'LS6 3AB', 'LS12 6LN',
	// Edinburgh postcodes
	'EH1 1SG', 'EH7 5JA', 'EH12 7XD',
	// Liverpool postcodes
	'L1 1JQ', 'L15 0EJ', 'L24 9GB',
	// ... other districts ...
];