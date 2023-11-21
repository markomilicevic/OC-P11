import { useSelector } from "react-redux";
import Maintenance from "../../pages/Maintenance";
import { UNAUTHORIZED_ERROR_TYPE } from "../../constants";

const ProtectedPage = ({ children }) => {
	const isLogged = useSelector((state) => state.currentUser.isLogged);

	if (!isLogged) {
		return <Maintenance errorType={UNAUTHORIZED_ERROR_TYPE} />;
	}

	return children;
};

export default ProtectedPage;
