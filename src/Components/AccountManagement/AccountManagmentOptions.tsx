import React, { useState } from 'react';
import AddAccountModal from "~Components/AccountManagement/AddAccountModal";
import { useStorage } from "@plasmohq/storage/dist/hook";
import AccountUKTable from "~Components/AccountManagement/AccountUKTable";
import AccountUSTable from "~Components/AccountManagement/AccountUSTable";

function AccountManagement() {



	return (
		<div className="accountManagementSection">
			<h2 className="optionsHeading">Frontend Accounts</h2>
			<div className="divider"/>
			<AccountUKTable/>
			<AccountUSTable/>
		</div>
	)
};


export default AccountManagement;