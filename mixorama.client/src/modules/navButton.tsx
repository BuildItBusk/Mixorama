import { Link } from "react-router-dom";

type NavButtonProps = {
    to: string;
    text: string;
    altText: string;
    iconUrl: string;
};

const NavButton = (props: NavButtonProps) => {
    const { to, text, altText, iconUrl } = props;
    return (
        <Link to={to}>
            <button className="text-white py-2 bg-transparent w-full hover:bg-gray-700">
                <div className="flex justify-center">
                    <img src={iconUrl} alt={altText} className="w-8 h-8 mb-2"/>
                </div>
                <span>{text}</span>
            </button>
        </Link>
    );
};

export default NavButton;