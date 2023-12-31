import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import EditUserInfo from "../../components/EditUserInfo";
import Account from "../../components/Account";

const accounts = [
	{
		id: 1,
		title: "Argent Bank Checking (x8349)",
		amount: "$2,082.79",
		amountDescription: "Available Balance",
	},
	{
		id: 2,
		title: "Argent Bank Savings (x6712)",
		amount: "$10,928.42",
		amountDescription: "Available Balance",
	},
	{
		id: 3,
		title: "Argent Bank Credit Card (x8349)",
		amount: "$184.30",
		amountDescription: "Current Balance",
	},
];

const Profile = () => {
	const [inEditMode, setInEditMode] = useState(false);

	useEffect(() => {
		document.title = "Argent Bank - Profile";
	}, []);

	return (
		<main className="main bg-dark">
			{inEditMode ? (
				<EditUserInfo onSaved={() => setInEditMode(false)} onCanceled={() => setInEditMode(false)} />
			) : (
				<ProfileHeader onEdit={() => setInEditMode(true)} />
			)}

			<h2 className="sr-only">Accounts</h2>
			{accounts.map((account) => (
				<Account key={account.id} title={account.title} amount={account.amount} amountDescription={account.amountDescription} />
			))}
		</main>
	);
};

export default Profile;
