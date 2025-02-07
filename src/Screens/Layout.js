import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function Layout() {
    return(
        <>
        <Navbar/>
        <Outlet/>
        <div className="mt-5">
        <Footer/>
        </div>
        </>
    );
}