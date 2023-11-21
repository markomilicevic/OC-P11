import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Page.css";

const Page = () => (
	<>
		<Header />
		<Outlet />
		<Footer />
	</>
);

export default Page;
