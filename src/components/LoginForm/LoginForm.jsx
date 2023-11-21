import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { API_BASE_URL, AUTO_LOGIN_ACTION } from "../../constants";
import "./LoginForm.css";

const LoginForm = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const resetAllErrors = () => {
		emailRef.current.setCustomValidity("");
		passwordRef.current.setCustomValidity("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isSubmitting) {
			return; // Submit already in progress
		}

		try {
			setIsSubmitting(true);

			const response = await fetch(`${API_BASE_URL}/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();

			// NOTE: Informing that the email is register is a bad security practice
			// NOTE: Ideally, ask the Backend to return the same error for both cases
			// NOTE: Assuming it's required to differentiate inside the exercise
			if (response.status === 400 && data.message && data.message.includes("User not found")) {
				emailRef.current.setCustomValidity("The email is not found");
				emailRef.current.reportValidity();
				return;
			} else if (response.status === 400 && data.message && data.message.includes("Password is invalid")) {
				passwordRef.current.setCustomValidity("The password is invalid");
				passwordRef.current.reportValidity();
				return;
			} else if (response.status !== 200 || !data.body || !data.body.token) {
				emailRef.current.setCustomValidity("An internal error occurred, please retry in few seconds");
				emailRef.current.reportValidity();
				return;
			}

			// Store the token
			let storage = window.sessionStorage; // Current session stored (by default)
			if (rememberMe) {
				storage = window.localStorage; // Long life storage across sessions
			}
			storage.setItem("token", data.body.token);

			// Do login
			dispatch(AUTO_LOGIN_ACTION);

			// Redirect to the Profile
			navigate("/profile");
		} catch {
			emailRef.current.setCustomValidity("An unknown error occurred, please check your network then retry");
			emailRef.current.reportValidity();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form action="." method="POST" onSubmit={handleSubmit}>
			<div className="input-wrapper">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					autoComplete="off"
					autoFocus
					ref={emailRef}
					onChange={(e) => {
						resetAllErrors();
						setEmail(e.target.value);
					}}
					required
				/>
			</div>
			<div className="input-wrapper">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					autoComplete="off"
					ref={passwordRef}
					onChange={(e) => {
						resetAllErrors();
						setPassword(e.target.value);
					}}
					required
				/>
			</div>
			<div className="input-remember">
				<input
					type="checkbox"
					id="remember-me"
					onChange={(e) => {
						resetAllErrors();
						setRememberMe(e.target.checked);
					}}
				/>
				<label htmlFor="remember-me">Remember me</label>
			</div>
			<div className="sign-in-button">
				<Button
					isLarge={true}
					onClick={() => {
						resetAllErrors();
					}}
				>
					Sign In
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
