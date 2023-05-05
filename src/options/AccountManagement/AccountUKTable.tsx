import React, { useState } from 'react';
import AddAccountModal from "~options/AccountManagement/AddAccountModal";
import { useStorage } from "@plasmohq/storage/dist/hook";

function AccountUKTable() {
	const [showNewAccountModal, setShowNewAccountModal] = useState(false);
	const [accountData, setAccountData] = useStorage("frontendAccounts",[]);
	const handleNewAccountButton = () => {
		setShowNewAccountModal(true);
	};

	const handleAddAccount = async (newAccount) => {
		await setAccountData((prevTableData) => [...prevTableData, newAccount]);
	};

	const handleDeleteAccount = async (accountId) => {
		await setAccountData((prevTableData) => prevTableData.filter((account) => account.id !== accountId));
	};


	return (
		<div className="accountManagementSection">
			<h2 className="optionSubHeading">UK Frontend</h2>
			<div className="overflow-x-auto">
				<table className="table table-compact accountManagementTable">
					<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>First Name</th>
						<th>Surname</th>
						<th>Email Address</th>
						<th>Contact Number</th>
						<th>House Name/Number</th>
						<th>Postcode</th>
						<th>County</th>
						<th>Address Line 1</th>
						<th>Address Line 2</th>
						<th>Town/City</th>
						<th>Delete</th>
					</tr>
					</thead>
					<tbody>
					{accountData.map((account) => (
						<tr key={account.id}>
							<td>{account.id}</td>
							<td>{account.title}</td>
							<td>{account.firstName}</td>
							<td>{account.surname}</td>
							<td>{account.emailAddress}</td>
							<td>{account.contactNumber}</td>
							<td>{account.houseNameNumber}</td>
							<td>{account.postcode}</td>
							<td>{account.county}</td>
							<td>{account.addressLine1}</td>
							<td>{account.addressLine2}</td>
							<td>{account.townCity}</td>
							<td>
								<button
									className="text-red-500"
									onClick={() => handleDeleteAccount(account.id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							</td>
						</tr>
					))}
					</tbody>
					<tfoot>
					<tr>
						<th></th>
						<th><button onClick={handleNewAccountButton}>Add New</button></th>
					</tr>
					</tfoot>
				</table>
			</div>
			{showNewAccountModal && (
				<AddAccountModal
					onClose={() => setShowNewAccountModal(false)}
					onAddAccount={handleAddAccount}
					checked={showNewAccountModal}
					isUK={true}
				/>
			)}

			<div className="divider"></div>
		</div>
	)
};


export default AccountUKTable;