
export enum ContentRequestType {
    WriteToClipboard
}

export interface ContentRequest {
    functionName: string;
    arguments: any[];
    type: ContentRequestType;
}
