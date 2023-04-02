import React, { useState } from "react";
import type { FrontendAccount } from "~Utils/UtilInterfaces";
import {Storage} from "@plasmohq/storage";
import { generateRandomFirstName, generateRandomSurname } from "~Utils/RandomGenerators/nameGenerator";
import { generateRandomEmail } from "~Utils/RandomGenerators/emailGenerator";
import { generateUKMobileNumber } from "~Utils/RandomGenerators/contactNumberGenerator";
import {
  generateAddressLine2,
  generateCounty,
  generateHouseNumber,
  generatePostcode,
  generateStreetName, generateTown
} from "~Utils/RandomGenerators/addressGenerator";


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
    console.log(titleInput.value);
    const firstNameInput = document.querySelector("input[name='firstName']") as HTMLInputElement;

    if (titleInput.value === "Mr" || titleInput.value === "Sir") {
      console.log("Generate male name");
      firstNameInput.value = generateRandomFirstName(true);
    }
    else{
      console.log("Generate Female name");
      firstNameInput.value = generateRandomFirstName(false);
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
    addressLine2Input.value = generateAddressLine2();
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
                  <option disabled selected>Select Title</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                  <option>Ms</option>
                  <option>Sir</option>
                </select>
              </label>
              <label className="input-group input-group-sm">
                <span>First Name</span>
                <input type="text"  name="firstName"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomFirstName}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Surname</span>
                <input type="text"  name="surname"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomSurname}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Email</span>
                <input type="text"  name="emailAddress"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomEmail}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Contact Number</span>
                <input type="text" name="contactNumber"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomContactNumber}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Postcode</span>
                <input type="text" name="postcode"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomPostcode}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>House Number/Name</span>
                <input type="text" name="houseNameNumber"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomHouseNumber}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Address Line 1</span>
                <input type="text" name="addressLine1"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomAddressLine1}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Address Line 2</span>
                <input type="text" name="addressLine2" placeholder="Optional" className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomAddressLine2}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>County</span>
                <input type="text" name="county"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomCounty}>Random</button>
              </label>
              <label className="input-group input-group-sm">
                <span>Town/City</span>
                <input type="text" name="townCity"  className="input input-sm input-bordered" />
                <button className="btn btn-sm btn-primary" type="button" onClick={randomTownCity}>Random</button>
              </label>
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