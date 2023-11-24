export enum ContentRequestType {
	WriteToClipboard,
	AutofillAccount
}

export interface ContentRequest {
	functionName: string;
	arguments: any[];
	type: ContentRequestType;
}
