import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../features/currentUser";
import { notify } from "../../features/notifications";
import Button from "../Button";
import { API_BASE_URL, SUCCESS_NOTIFICATION_TYPE, DEFAULT_NOTIFICATION_EXPIRATION_IN_MS } from "../../constants";

import "./EditUserInfo.css";

const EditUserInfo = ({ onSaved, onCanceled }) => {
	const newUserNameRef = useRef(null);

	const oldUserName = useSelector((state) => state.currentUser.profile.userName);
	const firstName = useSelector((state) => state.currentUser.profile.firstName);
	const lastName = useSelector((state) => state.currentUser.profile.lastName);
	const token = useSelector((state) => state.currentUser.token);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newUserName, setNewUserName] = useState(oldUserName);

	const dispatch = useDispatch();

	const resetAllErrors = () => {
		newUserNameRef.current.setCustomValidity("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isSubmitting) {
			return; // Submit already in progress
		}

		try {
			setIsSubmitting(true);

			// Update the username trough the API
			const response = await fetch(`${API_BASE_URL}/user/profile`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userName: newUserName,
				}),
			});
			const data = await response.json();
			if (data.status !== 200 || !data.body) {
				newUserNameRef.current.setCustomValidity(`An error occured with status: ${data.status}`);
				newUserNameRef.current.reportValidity();
				return;
			}

			// Update the currently stored `userName` from the store
			dispatch(
				setProfile({
					userName: newUserName,
					firstName: data.body.firstName,
					lastName: data.body.lastName,
				})
			);

			// Show a success feedback
			dispatch(
				notify({
					id: `${Math.random()}`,
					type: SUCCESS_NOTIFICATION_TYPE,
					message: "User name changed with success",
					expireAt: new Date(new Date().getTime() + DEFAULT_NOTIFICATION_EXPIRATION_IN_MS).toISOString(),
				})
			);

			// Inform the parent component that edition succeed
			onSaved();
		} catch {
			newUserNameRef.current.setCustomValidity("An unknown error occurred, please check your network then retry");
			newUserNameRef.current.reportValidity();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="edit-user-info">
			<h2>Edit user info</h2>
			<form onSubmit={handleSubmit} className="edit-form" action="." method="POST">
				<div className="edit-row">
					<label className="edit-label" htmlFor="new-username">
						User name:
					</label>
					<div className="edit-field">
						<input
							id="new-username"
							type="text"
							name="new-username"
							defaultValue={oldUserName}
							autoComplete="off"
							autoFocus
							required
							ref={newUserNameRef}
							onChange={(event) => {
								resetAllErrors();
								setNewUserName(event.target.value);
							}}
						/>
					</div>
				</div>
				<div className="edit-row">
					<span className="edit-label">First name:</span>
					<div className="edit-field">
						<input type="text" name="firstname" value={firstName} disabled />
					</div>
				</div>
				<div className="edit-row">
					<span className="edit-label">Last name:</span>
					<div className="edit-field">
						<input type="text" name="lastname" value={lastName} disabled />
					</div>
				</div>
				<div className="edit-actions">
					<div className="primary-action">
						<Button
							onClick={() => {
								resetAllErrors();
							}}
						>
							Save
						</Button>
					</div>
					<div className="secondary-action">
						<Button
							onClick={(event) => {
								event.preventDefault();
								onCanceled();
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditUserInfo;
