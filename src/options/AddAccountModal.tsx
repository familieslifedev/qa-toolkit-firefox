import React from "react";
import type { FrontendAccount } from "~Utils/UtilInterfaces";
import {Storage} from "@plasmohq/storage";


const generateUniqueId = async (isUK: boolean) => {
  const accountStorage = new Storage;
  let currentAccounts: FrontendAccount[] = await accountStorage.get("frontendAccounts")
  const maxId = currentAccounts.length > 0 ? Math.max(...currentAccounts.map((account) => account.id)) : 0;
  return maxId + 1;
}

function AddAccountModal({ onClose, onAddAccount, checked }) {

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
              </label>
              <label className="input-group input-group-sm">
                <span>Surname</span>
                <input type="text"  name="surname"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Email</span>
                <input type="text"  name="emailAddress"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Contact Number</span>
                <input type="text" name="contactNumber"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>House Number/Name</span>
                <input type="text" name="houseNameNumber"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Postcode</span>
                <input type="text" name="postcode"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>County</span>
                <input type="text" name="county"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Address Line 1</span>
                <input type="text" name="addressLine1"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Address Line 2</span>
                <input type="text" name="addressLine2"  className="input input-sm input-bordered" />
              </label>
              <label className="input-group input-group-sm">
                <span>Town/City</span>
                <input type="text" name="townCity"  className="input input-sm input-bordered" />
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