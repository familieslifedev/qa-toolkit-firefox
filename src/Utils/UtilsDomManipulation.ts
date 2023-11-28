import { Storage } from "@plasmohq/storage";
import {usStates} from "~Utils/RandomGenerators/addressGenerator";
new Storage();
export async function autofillUkFrontendAccount(account) {

	// Change Lead Source
	const leadSourceSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Lead_Source');
	leadSourceSelectElement.value = '3'; // this is the showroom(walkin) option
	const changeLeadEvent = new Event('change');
	leadSourceSelectElement.dispatchEvent(changeLeadEvent);

	//Change Lead Method
	const leadMethodSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Lead_SubSource');
	leadMethodSelectElement.value = '1'; // this is the showroom(walkin) option
	const changeMethodEvent = new Event('change');
	leadMethodSelectElement.dispatchEvent(changeMethodEvent);

	//Customer Details
	const titleSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Account_NamePrefix');
	titleSelectElement.value = account.title.toUpperCase();
	const changeTitleEvent = new Event('change');
	titleSelectElement.dispatchEvent(changeTitleEvent);

	// Set first name
	const firstNameInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_FirstName');
	firstNameInputElement.value = account.firstName;

	// Set surname
	const surnameInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_LastName');
	surnameInputElement.value = account.surname;

	// Set email address
	const emailAddressInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Email');
	emailAddressInputElement.value = account.emailAddress;

	// Set contact numbers
	const contactNumberInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Phone');
	contactNumberInputElement.value = account.contactNumber.toString();
	const contactNumberInputElement2 = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Mobile');
	contactNumberInputElement2.value = account.contactNumber.toString();

	// Contact Method
	const contactMethodSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Account_BestContactMethod');
	contactMethodSelectElement.value = '1'; // This is the email option
	const changeContactMethodEvent = new Event('change');
	contactMethodSelectElement.dispatchEvent(changeContactMethodEvent);

	// Best Time to Contact
	const bestTimeToContactInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_BestContactTimes_ANYTIME');
	bestTimeToContactInputElement.checked = true; // This is a checkbox
	const changeBestTimeToContactEvent = new Event('change');
	bestTimeToContactInputElement.dispatchEvent(changeBestTimeToContactEvent);

	// Set house name number
	const houseNameNumberInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Property');
	houseNameNumberInputElement.value = account.houseNameNumber;
	const changeHouseNameNumberEvent = new Event('change');
	houseNameNumberInputElement.dispatchEvent(changeHouseNameNumberEvent);

	// Set postcode
	const postcodeInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Postcode');
	postcodeInputElement.value = account.postcode;
	const changePostcodeEvent = new Event('change');
	postcodeInputElement.dispatchEvent(changePostcodeEvent);

	// Set county
	const countyInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_County');
	countyInputElement.value = account.county;
	const changeCountyEvent = new Event('change');
	countyInputElement.dispatchEvent(changeCountyEvent);

	// Set address line 1
	const addressLine1InputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_AddressLine1');
	addressLine1InputElement.value = account.addressLine1;
	const changeAddressLine1Event = new Event('change');
	addressLine1InputElement.dispatchEvent(changeAddressLine1Event);

	// Set address line 2
	const addressLine2InputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_AddressLine2');
	addressLine2InputElement.value = account.addressLine2;
	const changeAddressLine2Event = new Event('change');
	addressLine2InputElement.dispatchEvent(changeAddressLine2Event);

	// Set town city
	const townCityInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Town');
	townCityInputElement.value = account.townCity;
	const changeTownCityEvent = new Event('change');
	townCityInputElement.dispatchEvent(changeTownCityEvent);

	//Set customer investment
	const customerInvestmentInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Lead_EstimatedBudgetPence');
	customerInvestmentInputElement.value = '1000';
	const changeCustomerInvestmentEvent = new Event('change');
	customerInvestmentInputElement.dispatchEvent(changeCustomerInvestmentEvent);

}

export async function autofillUsFrontendAccount(account) {
	console.log("autofillUsFrontendAccount");
	// Change Lead Source
	const leadSourceSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Lead_Source');
	leadSourceSelectElement.value = '3'; // this is the showroom(walkin) option
	const changeLeadEvent = new Event('change');
	leadSourceSelectElement.dispatchEvent(changeLeadEvent);

	//Change Lead Method
	const leadMethodSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Lead_SubSource');
	leadMethodSelectElement.value = '1'; // this is the showroom(walkin) option
	const changeMethodEvent = new Event('change');
	leadMethodSelectElement.dispatchEvent(changeMethodEvent);

	//Customer Details
	const titleSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Account_NamePrefix');
	titleSelectElement.value = account.title.toUpperCase();
	const changeTitleEvent = new Event('change');
	titleSelectElement.dispatchEvent(changeTitleEvent);

	// Set first name
	const firstNameInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_FirstName');
	firstNameInputElement.value = account.firstName;

	// Set surname
	const surnameInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_LastName');
	surnameInputElement.value = account.surname;

	// Set email address
	const emailAddressInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Email');
	emailAddressInputElement.value = account.emailAddress;

	// Set contact numbers
	const contactNumberInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Phone');
	contactNumberInputElement.value = account.contactNumber.toString();
	const contactNumberInputElement2 = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_Mobile');
	contactNumberInputElement2.value = account.contactNumber.toString();

	// Contact Method
	const contactMethodSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Account_BestContactMethod');
	contactMethodSelectElement.value = '1'; // This is the email option
	const changeContactMethodEvent = new Event('change');
	contactMethodSelectElement.dispatchEvent(changeContactMethodEvent);

	//Set Phone Type 1
	const phoneTypeInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_contactNumberTypeOne_1');
	phoneTypeInputElement.checked = true; // This is a checkbox
	const changePhoneTypeEvent = new Event('change');
	phoneTypeInputElement.dispatchEvent(changePhoneTypeEvent);

	//Set Phone Type 2
	const phoneType2InputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_contactNumberTypeTwo_LANDLINE');
	phoneType2InputElement.checked = true; // This is a checkbox
	const changePhone2TypeEvent = new Event('change');
	phoneType2InputElement.dispatchEvent(changePhoneTypeEvent);

	// Best Time to Contact
	const bestTimeToContactInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Account_BestContactTimes_ANYTIME');
	bestTimeToContactInputElement.checked = true; // This is a checkbox
	const changeBestTimeToContactEvent = new Event('change');
	bestTimeToContactInputElement.dispatchEvent(changeBestTimeToContactEvent);

	// Set house name number
	const houseNameNumberInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Property');
	houseNameNumberInputElement.value = account.houseNameNumber;
	const changeHouseNameNumberEvent = new Event('change');
	houseNameNumberInputElement.dispatchEvent(changeHouseNameNumberEvent);

	// Set zipcode
	const postcodeInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Postcode');
	postcodeInputElement.value = account.postcode;
	const changePostcodeEvent = new Event('change');
	postcodeInputElement.dispatchEvent(changePostcodeEvent);

	// Set State
	const stateSelectElement = <HTMLSelectElement>document.getElementById('formCustomerRequirement_Address_State');
	const stateIndex = usStates.findIndex((state) => state === account.county) +1;
	console.log("County: " + account.county)
	console.log("State: " + stateIndex);
	stateSelectElement.value = String(stateIndex);
	const changeStateEvent = new Event('change');
	stateSelectElement.dispatchEvent(changeStateEvent);

	// Set address line 1
	const addressLine1InputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_AddressLine1');
	addressLine1InputElement.value = account.addressLine1;
	const changeAddressLine1Event = new Event('change');
	addressLine1InputElement.dispatchEvent(changeAddressLine1Event);

	// Set address line 2
	const addressLine2InputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_AddressLine2');
	addressLine2InputElement.value = account.addressLine2;
	const changeAddressLine2Event = new Event('change');
	addressLine2InputElement.dispatchEvent(changeAddressLine2Event);

	// Set town city
	const townCityInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Address_Town');
	townCityInputElement.value = account.townCity;
	const changeTownCityEvent = new Event('change');
	townCityInputElement.dispatchEvent(changeTownCityEvent);

	//Set customer investment
	const customerInvestmentInputElement = <HTMLInputElement>document.getElementById('formCustomerRequirement_Lead_EstimatedBudgetPence');
	customerInvestmentInputElement.value = '1000';
	const changeCustomerInvestmentEvent = new Event('change');
	customerInvestmentInputElement.dispatchEvent(changeCustomerInvestmentEvent);


}
