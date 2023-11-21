import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";
import { useSelector } from "react-redux";

const Header = () => {
	const isLogged = useSelector((state) => state.currentUser.isLogged);
	const userName = useSelector((state) => state.currentUser.profile.userName);

	const handleSignout = () => {
		window.sessionStorage.clear();
		window.localStorage.clear();
		// Follow the href
	};

	return (
		<nav className="main-nav">
			<Link to="/" className="main-nav-logo">
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{isLogged ? (
					<>
						<Link to="/profile" className="main-nav-item">
							<i className="fa fa-user-circle"></i> {userName}
						</Link>
						<a href="/" className="main-nav-item" onClick={handleSignout}>
							<i className="fa fa-sign-out"></i> Sign Out
						</a>
					</>
				) : (
					<Link to="/login" className="main-nav-item">
						<i className="fa fa-user-circle"></i> Sign In
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Header;
