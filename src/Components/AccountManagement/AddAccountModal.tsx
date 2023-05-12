import React from "react";
import type { FrontendAccount } from "~Utils/UtilInterfaces";
import {Storage} from "@plasmohq/storage";
import { generateRandomFirstName, generateRandomSurname } from "~Utils/RandomGenerators/nameGenerator";
import { generateRandomEmail } from "~Utils/RandomGenerators/emailGenerator";
import { generateMobileNumber } from "~Utils/RandomGenerators/contactNumberGenerator";
import {
	generateRandomVillage,
	generateCounty,
	generateHouseNumber,
	generatePostcode,
	generateStreetName, generateTown, generateZipcode, generateUsState, generateUsCity
} from "~Utils/RandomGenerators/addressGenerator";
import AddNewEntryInputComponent from "~Components/AccountManagement/Components/AddNewEntryInputComponent";


const generateUniqueId= async (isUK): Promise<number> => {
	const accountStorage: Storage = new Storage();
	let currentAccounts: FrontendAccount[] = isUK ? await accountStorage.get("frontendAccounts") : await accountStorage.get("frontendAccountsUS");
	if(!currentAccounts){
		isUK? await accountStorage.set("frontendAccounts", []) : await accountStorage.set("frontendAccountsUS", []);
	}

	const maxId = currentAccounts.length > 0 ? Math.max(...currentAccounts.map((account) => account.id)) : 0;
	return maxId + 1;
};



function AddAccountModal({ onClose, onAddAccount, checked, isUK }) {
	const [userFeedback, setUserFeedback ] = React.useState("");
	const handleSubmit = async (event) => {
		event.preventDefault();
		const formElements = event.currentTarget.elements;
		const newAccount:FrontendAccount = {
			id: await generateUniqueId(isUK),
			title: formElements.title.value,
			firstName: formElements.firstName.value,
			surname: formElements.surname.value,
			emailAddress: formElements.emailAddress.value,
			contactNumber: formElements.contactNumber.value,
			houseNameNumber: formElements.houseNameNumber.value,
			postcode: formElements.postcode.value,
			county: formElements.county.value,
			addressLine1: formElements.addressLine1.value,
			addressLine2: formElements.addressLine2.value,
			townCity: formElements.townCity.value,
		};
		if(formElements.title.value && formElements.firstName.value && formElements.surname.value && formElements.emailAddress.value && formElements.contactNumber.value && formElements.houseNameNumber.value && formElements.postcode.value && formElements.county.value && formElements.addressLine1.value && formElements.townCity.value) {
			setUserFeedback("")
			onAddAccount(newAccount);
			onClose();
		}
		else{
			setUserFeedback("Please fill in all required fields");
		}
	};


	function randomTitle(){
		const titleInput = document.querySelector("select[name='title']") as HTMLSelectElement;
		const titles = ["Mr", "Mrs", "Miss", "Ms", "Sir", "Dr"];
		titleInput.value = titles[Math.floor(Math.random() * titles.length)];
	}
	function randomFirstName() {
		const titleInput = document.querySelector("select[name='title']") as HTMLSelectElement;
		const firstNameInput = document.querySelector("input[name='firstName']") as HTMLInputElement;

		if (titleInput.value === "Mr" || titleInput.value === "Sir") {
			firstNameInput.value = generateRandomFirstName('male');
		}
		else if(titleInput.value === "Mrs" || titleInput.value === "Miss" || titleInput.value === "Ms"){
			firstNameInput.value = generateRandomFirstName('female');
		}
		else {
			firstNameInput.value = generateRandomFirstName('any');
		}
	}

	function randomSurname() {
		const surnameInput = document.querySelector("input[name='surname']") as HTMLInputElement;
		surnameInput.value = generateRandomSurname();
	}

	function randomEmail() {
		const firstNameInput = document.querySelector("input[name='firstName']") as HTMLInputElement;
		const surnameInput = document.querySelector("input[name='surname']") as HTMLInputElement;
		const emailAddressInput = document.querySelector("input[name='emailAddress']") as HTMLInputElement;
		emailAddressInput.value = generateRandomEmail(firstNameInput.value, surnameInput.value);
	}

	function randomContactNumber() {
		const contactNumberInput = document.querySelector("input[name='contactNumber']") as HTMLInputElement;
		contactNumberInput.value = generateMobileNumber(isUK);
	}

	function randomHouseNumber() {
		const houseNumberInput = document.querySelector("input[name='houseNameNumber']") as HTMLInputElement;
		houseNumberInput.value = generateHouseNumber()
	}

	function randomPostcode() {
		const postcodeInput = document.querySelector("input[name='postcode']") as HTMLInputElement;

		isUK ? postcodeInput.value = generatePostcode() : postcodeInput.value = generateZipcode();
	}

	function randomCounty() {
		const countyInput = document.querySelector("input[name='county']") as HTMLInputElement;
		isUK ? countyInput.value = generateCounty() : countyInput.value = generateUsState();
	}

	function randomAddressLine1() {
		const addressLine1Input = document.querySelector("input[name='addressLine1']") as HTMLInputElement;
		addressLine1Input.value = generateStreetName();
	}

	function randomTownCity() {
		const townCityInput = document.querySelector("input[name='townCity']") as HTMLInputElement;
		isUK ? townCityInput.value = generateTown() : townCityInput.value = generateUsCity();
	}

	function randomAddressLine2() {
		const addressLine2Input = document.querySelector("input[name='addressLine2']") as HTMLInputElement;
		addressLine2Input.value = generateRandomVillage();
	}

	function randomAll(){
		setUserFeedback("");
		randomTitle();
		randomFirstName();
		randomSurname();
		randomEmail();
		randomContactNumber();
		randomHouseNumber();
		randomPostcode();
		randomCounty();
		randomAddressLine1();
		randomTownCity();
	}

	return (
		<>
			<input type="checkbox" id="addAccountModal" className="modal-toggle" checked={checked} readOnly />
			<div className="modal">
				<div className="modal-box addAccountModal">
					<h3 className="font-bold text-lg">Add New Entry</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-control" >
							<label className="input-group input-group-sm">
								<span>Title</span>
								<select className="select select-sm select-bordered" name="title">
									<option>Mr</option>
									<option>Mrs</option>
									<option>Miss</option>
									<option>Ms</option>
									<option>Sir</option>
									<option>Dr</option>
								</select>
								<button className="btn btn-sm btn-primary" type="button" onClick={randomTitle}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
										 stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
									</svg>
								</button>
							</label>
							<AddNewEntryInputComponent onClickFunction={randomFirstName} prettyName={'First Name'} inputName={'firstName'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomSurname} prettyName={'Surname'} inputName={'surname'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomEmail} prettyName={'Email Address'} inputName={'emailAddress'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomContactNumber} prettyName={'Phone Number'} inputName={'contactNumber'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomPostcode} prettyName={'Postcode'} inputName={'postcode'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomHouseNumber} prettyName={'House Number'} inputName={'houseNameNumber'}></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomAddressLine1} prettyName={'Address Line 1'} inputName={'addressLine1'} ></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomAddressLine2} prettyName={'Address Line 2'} inputName={'addressLine2'} placeholder={'Optional'} ></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomCounty} prettyName={'County'} inputName={'county'} ></AddNewEntryInputComponent>
							<AddNewEntryInputComponent onClickFunction={randomTownCity} prettyName={'Town/City'} inputName={'townCity'} ></AddNewEntryInputComponent>
						</div>
						<div className="modal-action">
							<p className="text text-error">{userFeedback}</p>
							<button className="btn btn-primary" type="button" onClick={randomAll}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
									 stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round"
										  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
								</svg>
							</button>
							<button className="btn btn-primary" type="submit">
								Add
							</button>

							<button className="btn btn-secondary" onClick={onClose}>Cancel</button>

						</div>
					</form>
				</div>
			</div>
		</>
	);
}


export default AddAccountModal