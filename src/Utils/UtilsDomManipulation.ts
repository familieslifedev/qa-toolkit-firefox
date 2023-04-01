import { Storage } from "@plasmohq/storage";
import type { FrontendAccount } from "~Utils/UtilInterfaces";

const accountStorage = new Storage();
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
}
