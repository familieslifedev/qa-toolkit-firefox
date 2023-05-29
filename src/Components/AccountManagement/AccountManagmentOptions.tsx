import React, { useState } from 'react';
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