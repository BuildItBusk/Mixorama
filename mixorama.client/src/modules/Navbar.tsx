import NavButton from "./NavButton";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const { permissions } = useAuth() || {};
    const displayAddButton =  permissions?.some(c => c.type === "permissions" && c.value === "create:cocktails");

    return (
        <>
        <nav>
            <div className="fixed bottom-0 w-full border-t border-gray-700">
                <div className="flex justify-around m-4">
                    <NavButton to="/random" text="Tilfældig" altText="Find tilfældig cocktail" iconUrl="dice_icon.png" />
                    <NavButton to="/search" text="Søg" altText="Søg efter cocktail" iconUrl="search_icon.png" />
                    {displayAddButton && 
                    <NavButton to="/create" text="Opret" altText="Opret ny cocktail" iconUrl="add_icon.png" />}
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;