import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	list: [],
};

const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		notify: (state, action) => {
			state.list.push({
				id: action.payload.id,
				type: action.payload.type,
				message: action.payload.message,
				expireAt: action.payload.expireAt,
			});
		},
		close: (state, action) => {
			const indexToRemove = state.list.findIndex((notification) => notification.id === action.payload);
			if (indexToRemove === -1) {
				return; // Already removed
			}
			state.list.splice(indexToRemove, 1);
		},
	},
});

const { actions, reducer } = notificationsSlice;
export const { notify, close } = actions;
export default reducer;
