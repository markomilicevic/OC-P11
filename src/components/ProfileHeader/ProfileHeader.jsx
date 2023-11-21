import Button from "../Button";
import "./ProfileHeader.css";

const ProfileHeader = ({ onEdit }) => {
	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				Tony Jarvis!
			</h1>
			<Button onClick={() => {}}>Edit Name</Button>
		</div>
	);
};

export default ProfileHeader;
