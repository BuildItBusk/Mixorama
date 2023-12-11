import NavButton from "./navButton";

const Navbar = () => {

    return (
        <>
        <nav>
            <div className="fixed bottom-0 w-full border-t border-gray-700">
                <div className="flex justify-around m-4">
                    <NavButton to="/random" text="Tilfældig" altText="Find tilfældig cocktail" iconUrl="dice_icon.png" />
                    <NavButton to="/search" text="Søg" altText="Søg efter cocktail" iconUrl="search_icon.png" />
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;