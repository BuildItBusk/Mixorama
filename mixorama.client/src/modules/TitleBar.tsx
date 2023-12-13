import { Link } from "react-router-dom";

const TitleBar = () => {
    return(
        <div className="fixed top-0 w-full border-b border-gray-700">
            <div className="px-4 py-2 grid grid-cols-2">
                <div >
                    <h1 className="text-2xl">Mixorama</h1>
                </div>
                <div className="absolute right-4">
                    <Link to="/profile">
                        <img src="user_icon.png" className="h-8" alt="Profile" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TitleBar;