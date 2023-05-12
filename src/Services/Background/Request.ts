
export enum RequestType {
    InjectConsoleCommand,
    Get2dJson,
    Get3dJson,
    GetJson,
    SavePlanJson,
    OpenOptionsPage,
    OpenInNewTab,
    OpenInCurrentTab
}

export interface Request {
    functionName: string;
    arguments: any[];
    type: RequestType;
}
