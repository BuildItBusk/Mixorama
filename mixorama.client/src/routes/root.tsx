import { Outlet } from "react-router-dom";
import Layout from "../modules/Layout";

const Root = () => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
}

export default Root;