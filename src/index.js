import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Page from "./layouts/Page";
import ProtectedPage from "./layouts/ProtectedPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintenance";
import store from "./utils/store";
import { AUTO_LOGIN_ACTION, NOT_FOUND_ERROR_TYPE } from "./constants";

const router = createBrowserRouter([
	{
		element: <Page />,
		loader: () => {
			// Do login when page loaded
			store.dispatch(AUTO_LOGIN_ACTION);
			return {};
		},
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/profile",
				element: (
					<ProtectedPage>
						<Profile />
					</ProtectedPage>
				),
			},
			{
				path: "*",
				element: <Maintenance errorType={NOT_FOUND_ERROR_TYPE} />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
