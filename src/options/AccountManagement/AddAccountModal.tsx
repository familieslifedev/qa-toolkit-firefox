import React, { useState } from "react";
import type { FrontendAccount } from "~Utils/UtilInterfaces";
import {Storage} from "@plasmohq/storage";
import { generateRandomFirstName, generateRandomSurname } from "~Utils/RandomGenerators/nameGenerator";
import { generateRandomEmail } from "~Utils/RandomGenerators/emailGenerator";
import { generateUKMobileNumber } from "~Utils/RandomGenerators/contactNumberGenerator";
import {
  generateRandomVillage,
  generateCounty,
  generateHouseNumber,
  generatePostcode,
  generateStreetName, generateTown
} from "~Utils/RandomGenerators/addressGenerator";
import AddNewEntryInputComponent from "~options/AccountManagement/Components/AddNewEntryInputComponent";


const generateUniqueId = async (isUK: boolean) => {
  const accountStorage = new Storage;
  let currentAccounts: FrontendAccount[] = await accountStorage.get("frontendAccounts")
  const maxId = currentAccounts.length > 0 ? Math.max(...currentAccounts.map((account) => account.id)) : 0;
  return maxId + 1;
}

function AddAccountModal({ onClose, onAddAccount, checked }) {
  const [isEmailRandomDisabled, setIsEmailRandomDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    const newAccount:FrontendAccount = {
      id: await generateUniqueId(true),
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

    onAddAccount(newAccount);
    onClose();
  };


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
    contactNumberInput.value = generateUKMobileNumber();
  }

  function randomHouseNumber() {
    const houseNumberInput = document.querySelector("input[name='houseNameNumber']") as HTMLInputElement;
    houseNumberInput.value = generateHouseNumber()
  }

  function randomPostcode() {
    const postcodeInput = document.querySelector("input[name='postcode']") as HTMLInputElement;
    postcodeInput.value = generatePostcode();
  }

  function randomCounty() {
    const countyInput = document.querySelector("input[name='county']") as HTMLInputElement;
    countyInput.value = generateCounty();
  }

  function randomAddressLine1() {
    const addressLine1Input = document.querySelector("input[name='addressLine1']") as HTMLInputElement;
    addressLine1Input.value = generateStreetName();
  }

  function randomTownCity() {
    const townCityInput = document.querySelector("input[name='townCity']") as HTMLInputElement;
    townCityInput.value = generateTown();
  }

  function randomAddressLine2() {
    const addressLine2Input = document.querySelector("input[name='addressLine2']") as HTMLInputElement;
    addressLine2Input.value = generateRandomVillage();
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
                    <option disabled selected>Select</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Miss</option>
                    <option>Ms</option>
                    <option>Sir</option>
                    <option>Dr</option>
                  </select>
                </label>
                <AddNewEntryInputComponent onClickFunction={randomFirstName} prettyName={'First Name'} inputName={'firstName'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent onClickFunction={randomSurname} prettyName={'Surname'} inputName={'surname'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent onClickFunction={randomEmail} prettyName={'Email Address'} inputName={'emailAddress'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent onClickFunction={randomContactNumber} prettyName={'Phone Number'} inputName={'contactNumber'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent onClickFunction={randomPostcode} prettyName={'Postcode'} inputName={'postcode'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent onClickFunction={randomHouseNumber} prettyName={'House Number'} inputName={'houseNameNumber'}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent prettyName={'Address Line 1'} inputName={'addressLine1'} onClickFunction={randomAddressLine1}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent prettyName={'Address Line 2'} inputName={'addressLine2'} onClickFunction={randomAddressLine2}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent prettyName={'County'} inputName={'county'} onClickFunction={randomCounty}></AddNewEntryInputComponent>
                <AddNewEntryInputComponent prettyName={'Town/City'} inputName={'townCity'} onClickFunction={randomTownCity}></AddNewEntryInputComponent>
              </div>
              <div className="modal-action">
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