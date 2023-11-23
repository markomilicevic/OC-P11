import { useSelector } from "react-redux";
import Button from "../Button";
import "./ProfileHeader.css";

const ProfileHeader = ({ onEdit }) => {
	const firstName = useSelector((state) => state.currentUser.profile.firstName);
	const lastName = useSelector((state) => state.currentUser.profile.lastName);

	return (
		<div className="header">
			<h2>
				Welcome back
				<br />
				{firstName} {lastName}!
			</h2>
			<Button onClick={() => onEdit()}>Edit Name</Button>
		</div>
	);
};

export default ProfileHeader;