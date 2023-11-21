import Button from "../Button";
import "./LoginForm.css";

const LoginForm = () => {
	return (
		<form action="/profile" method="GET">
			<div className="input-wrapper">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" autoComplete="off" autoFocus required />
			</div>
			<div className="input-wrapper">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" autoComplete="off" required />
			</div>
			<div className="input-remember">
				<input type="checkbox" id="remember-me" />
				<label htmlFor="remember-me">Remember me</label>
			</div>
			<div className="sign-in-button">
				<Button isLarge={true} onClick={() => {}}>
					Sign In
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
