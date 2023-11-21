import "./FeatureItem.css";
import iconChat from "./iconChat.png";
import iconMoney from "./iconMoney.png";
import iconSecurity from "./iconSecurity.png";

const FeatureItem = ({ icon, title, description }) => {
	let iconImg = <></>;
	switch (icon) {
		case "chat":
		default:
			iconImg = <img src={iconChat} alt={`${icon} icon`} className="feature-icon" />;
			break;
		case "money":
			iconImg = <img src={iconMoney} alt={`${icon} icon`} className="feature-icon" />;
            break;
		case "security":
			iconImg = <img src={iconSecurity} alt={`${icon} icon`} className="feature-icon" />;
            break;
	}

	return (
		<div className="feature-item">
			{iconImg}
			<h3 className="feature-item-title">{title}</h3>
			<p>{description}</p>
		</div>
	);
};

export default FeatureItem;
