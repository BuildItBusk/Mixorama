import Navbar from "../modules/navbar";

const Root = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                    <a href={`/account`}>Account</a>
                    </li>
                    <li>
                    <a href={`/login`}>Login</a>
                    </li>
                </ul>
            </nav>
            <Navbar />
        </>
    );
}

export default Root;