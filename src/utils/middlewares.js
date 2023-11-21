import { login, setProfile } from "../features/currentUser";
import { notify } from "../features/notifications";
import { API_BASE_URL, AUTO_LOGIN_ACTION_TYPE, ERROR_NOTIFICATION_TYPE, DEFAULT_NOTIFICATION_EXPIRATION_IN_MS } from "../constants";

export const autoLoginMiddleware = (store) => (next) => (action) => {
	if (action.type !== AUTO_LOGIN_ACTION_TYPE) {
		return next(action); // Not concerned: nothing to do
	}
	if (store.getState().currentUser?.profile?.userName) {
		return next(action); // Already logged: nothing to do
	}

	// Login using the token
	let token = window.localStorage.getItem("token");
	if (!token) {
		token = window.sessionStorage.getItem("token");
		if (!token) {
			return next(action); // Missing token: nothing to do
		}
	}
	store.dispatch(login(token));

	next(action);

	// Async and non-blocking: fetch current user profile
	// This part can failed in case of network issue
	// In that case we enter in degraded mode
	fetch(`${API_BASE_URL}/user/profile`, {
		// NOTE: The GET method is more appropriate here, ideally ask the Backend to change it
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status !== 200 || !data.body) {
				throw new Error(`Received response: ${JSON.stringify(data)}`);
			}
			store.dispatch(
				setProfile({
					userName: data.body.userName,
					firstName: data.body.firstName,
					lastName: data.body.lastName,
				})
			);
		})
		.catch((err) => {
			console.error(`An error occured in auto login: ${err.message}`);
			store.dispatch(
				notify({
					id: `${Math.random()}`,
					type: ERROR_NOTIFICATION_TYPE,
					message: "Sorry, an error occured during page loading, your experience can be affected, please reload the page in few minutes",
					expireAt: new Date(new Date().getTime() + DEFAULT_NOTIFICATION_EXPIRATION_IN_MS).toISOString(),
				})
			);
			// Continue in degraded mode
		});
};
