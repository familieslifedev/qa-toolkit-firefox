export enum RequestType {
	InjectConsoleCommand,
	Get2dJson,
	Get3dJson,
	SavePlanJson,
	OpenOptionsPage,
	OpenInNewTab,
	OpenInCurrentTab,
	GetCurrentUrl
}

export interface Request {
	functionName: string;
	arguments: any[];
	type: RequestType;
}
