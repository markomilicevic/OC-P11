import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogged: false,
	token: null,
	profile: {
		userName: "",
		firstName: "",
		lastName: "",
	},
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogged = true;
			state.token = action.payload;
		},
		setProfile: (state, action) => {
			state.profile.userName = action.payload.userName;
			state.profile.firstName = action.payload.firstName;
			state.profile.lastName = action.payload.lastName;
		},
	},
});

const { actions, reducer } = currentUserSlice;
export const { login, setProfile } = actions;
export default reducer;
