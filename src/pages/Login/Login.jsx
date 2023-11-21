import { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import "./Login.css";

const Login = () => {
	useEffect(() => {
		document.title = "Argent Bank - Signin";
	}, []);

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>

				<h1>Sign In</h1>
				<LoginForm />
			</section>
		</main>
	);
};

export default Login;
