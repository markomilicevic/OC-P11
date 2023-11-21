import Button from "../Button";
import "./Account.css";

const Account = ({ title, amount, amountDescription }) => (
	<section className="account">
		<div className="account-content-wrapper">
			<h3 className="account-title">{title}</h3>
			<p className="account-amount">{amount}</p>
			<p className="account-amount-description">{amountDescription}</p>
		</div>
		<div className="account-content-wrapper cta">
			<div className="transaction-button">
				<Button isLarge={true} onClick={() => {}}>
					View transactions
				</Button>
			</div>
		</div>
	</section>
);

export default Account;
