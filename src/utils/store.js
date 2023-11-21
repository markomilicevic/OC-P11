import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUser";
import notificationsReducer from "../features/notifications";
import { autoLoginMiddleware } from "./middlewares";

export default configureStore({
	reducer: {
		currentUser: currentUserReducer,
		notifications: notificationsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(autoLoginMiddleware),
});
