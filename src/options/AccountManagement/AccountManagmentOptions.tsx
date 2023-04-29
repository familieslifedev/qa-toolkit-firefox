import React, { useState } from 'react';
import AddAccountModal from "~options/AccountManagement/AddAccountModal";
import { useStorage } from "@plasmohq/storage/dist/hook";
import AccountUKTable from "~options/AccountManagement/AccountUKTable";
import AccountUSTable from "~options/AccountManagement/AccountUSTable";

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