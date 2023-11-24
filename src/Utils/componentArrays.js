export {}
export const regionArray = [
	{Code: 'com', Name: "UK", Jenkins: 'build-gb', Emissary: "https://wren-aws-dev.eu-west-1.emissary.wrenkitchens.com/applications/frontend/"},
	{Code: "us", Name: "US", Jenkins: 'build-us', Emissary: "https://wren-aws-dev-us.us-east-1.emissary.wrenkitchens.com/applications/frontend/"},
];

export const jenkinsJobsArray = [
	{Job: 'planner3d-gameci-native', Name: "Planner3D Mac", Modfier:' '},
	{Job: "planner3d-gameci-native-windows", Name: "Planner3D Win", Modfier:' '},
	{Job: "planner3d-assets-gameci", Name: "Planner3D Assets", Modfier:' '},
	{Job: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser", Modfier:' '},
	{Job: "wrender-gameci-test", Name: "Planner3D HQ", Modfier:' '},
	{Job: "selenium-end-to-end-tests", Name: "Selenium Tests", Modfier:'build?delay=0sec'},
	{Job: "planner2d", Name: "Planner2D", Modfier:' '},
	{Job: "frontend", Name: "Frontend", Modfier:' '},
	{Job: "feeder", Name: "Feeder", Modfier:' '},
];

export const environmentArray = [
	{Code: "", Name: "Live"},
	{Code: "training", Name: "Training"},
	{Code: "project0", Name: "Project 0"},
	{Code: "project1", Name: "Project 1"},
	{Code: "project2", Name: "Project 2"},
	{Code: "project3", Name: "Project 3"},
	{Code: "project4", Name: "Project 4"},
	{Code: "project5", Name: "Project 5"},
	{Code: "project6", Name: "Project 6"},
	{Code: "project7", Name: "Project 7"},
	{Code: "project8", Name: "Project 8"},
]

export const rundeckJobsArray = [
	{Job: "singleIndex", Name: "Single Index", UK:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/0bf80455-4f7c-480f-8692-2bd58a77f4f9", US:"https://rundeck.project.wrenkitchens.us/project/it-development/job/show/bccc98ba-5abb-431e-8961-0648613b4e7e"},
	{Job: "clearRedis", Name: "Clear Redis", UK:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/681c8511-98d1-483e-a763-1a4350c8e02f", US:"https://rundeck.project.wrenkitchens.us/project/it-development/job/show/4903331f-02aa-4272-930e-6a3ba3495b87"},
	{Job: "wwhCacheClear",Name: "Wwh Cache Clear", UK:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/f043b6c7-fe91-48c9-93fe-76d9fefbf32e", US:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/f043b6c7-fe91-48c9-93fe-76d9fefbf32e"},
	{Job: "wwhCombi",Name: "Wwh Combi Clear", UK:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/c55bdf92-17fc-4fa5-ae97-f6d1d1972ff4", US:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/c55bdf92-17fc-4fa5-ae97-f6d1d1972ff4"},
	{Job: "refreshElasticSearch",Name: "Refresh Elastic Search", UK:"https://rundeck.project.wrenkitchens.com/project/it-development/job/show/1904f5bc-d485-419f-ba4e-a87d0b752c68", US:"https://rundeck.project.wrenkitchens.us/project/it-development/job/show/5fd464e6-bd70-4130-9fbf-a643d1376379"},
];

export const emissaryJobsArray = [
	{Job: 'redis-clear-doctrine-result-cache', Name: "Clear Redis Cache"},
	{Job: "refresh-wwhcache", Name: "Refresh wwhcache"},
	{Job: "refresh-product-unit-range-combination", Name: "Refresh unit range combination"},

]

export const roomTypeArray = [
	{Code: 'kitchen', Name: 'Kitchen'},
	{Code: 'bedroom', Name: 'Bedroom'},
]
