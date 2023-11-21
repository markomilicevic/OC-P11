import { Outlet } from "react-router-dom";
import Notifications from "../../components/Notifications";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Page.css";

const Page = () => (
	<>
		<Notifications />
		<Header />
		<Outlet />
		<Footer />
	</>
);

export default Page;
