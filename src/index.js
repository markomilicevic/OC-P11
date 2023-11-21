import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./layouts/Page";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintenance";
import { NOT_FOUND_ERROR_TYPE } from "./constants";

const router = createBrowserRouter([
	{
		element: <Page />,
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
				element: <Profile />,
			},
			{
				path: "*",
				element: <Maintenance errorType={NOT_FOUND_ERROR_TYPE} />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
