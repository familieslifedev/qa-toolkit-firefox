import React from "react";

interface AddNewEntryInputComponentProps {
	prettyName: string;
	inputName: string;
	onClickFunction: () => void;
	placeholder?: string | undefined;
}

const AddNewEntryInputComponent: React.FC<AddNewEntryInputComponentProps> = ({ prettyName,inputName, onClickFunction,placeholder }) => {
	return (
		<label className="input-group input-group-sm">
			<span className="newAccountEntrySpan">{prettyName}</span>
			<input type="text" name={inputName} placeholder={placeholder} className="input input-sm input-bordered newAccountEntryInput" />
			<button className="btn btn-sm btn-primary" type="button" onClick={onClickFunction}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
					 stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round"
						  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
				</svg>
			</button>
		</label>
	);
}

export default AddNewEntryInputComponent;
