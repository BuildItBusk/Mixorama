import { useState } from "react";

const CreateCocktail = () => { 
    
    const [numberOfIngredients , setNumberOfIngredients] = useState(2);
    const [warningMessage, setWarningMessage] = useState('');
    const ingredients = [];

    function incrementNumberOfIngredients() {
        if (numberOfIngredients === 10) {
            setWarningMessage('You cannot add more than 10 ingredients');
            return;
        }
        setNumberOfIngredients(numberOfIngredients + 1);
    }

    for (let i = 0; i < numberOfIngredients; i++) {
    ingredients.push(
        <div key={`ingredient${i}`} className="flex my-2 content-center">
            <input type="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingredient name" required />
            <img src="red_cross_icon.png" className="h-6 ml-2 my-auto" alt="Remove ingredient" />
        </div>
    );
    }

    return (
        <>
            <div className="flex items-center justify-center content-start w-full">
                <form className="w-full max-w-xl">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cocktail name</label>
                        <input type="name" id="cocktailName" className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Piña Colada" required />
                    </div>
                    <div className="my-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A delicious cocktail with rum, coconut and pinaple." required />
                    </div>
                    <div className="my-4">
                        <label htmlFor={`ingredient${0}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient</label>       
                        {ingredients}
                    </div>
                    <div>
                        <button onClick={incrementNumberOfIngredients} className="bg-transparent border border-green-500 text-green-500 py-1 px-2 text-xs rounded flex items-center">
                            <span className="mr-2">+</span> Add more
                        </button>
                    </div>
                    <div className="my-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Create
                        </button>
                    </div>
                    <div>
                        <p className="text-red-500 text-xs italic">{warningMessage}</p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCocktail;