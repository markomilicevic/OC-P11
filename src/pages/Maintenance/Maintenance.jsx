import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NOT_FOUND_ERROR_TYPE } from "../../constants";
import "./Maintenance.css";

const Maintenance = ({ errorType }) => {
	const ERROR_MESSAGE_MAP = {
		[NOT_FOUND_ERROR_TYPE]: "Sorry, this page didn't exist",
	};
	const errorMessage = ERROR_MESSAGE_MAP[errorType] || "An internal error occured";

	useEffect(() => {
		document.title = "Argent Bank - Maintenance";
	}, []);

	return (
		<div className="maintenance-page">
			<strong className="maintenance-message">{errorMessage}</strong>

			<Link to="/" className="maintenance-recommendation">
				Back to the homepage
			</Link>
		</div>
	);
};

export default Maintenance;
