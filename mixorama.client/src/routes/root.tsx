import { Outlet } from "react-router-dom";
import Navbar from "../modules/Navbar";
import TitleBar from "../modules/TitleBar";

const Root = () => {
    return (
        <>
            <TitleBar />
            <Outlet />
            <Navbar />
        </>
    );
}

export default Root;