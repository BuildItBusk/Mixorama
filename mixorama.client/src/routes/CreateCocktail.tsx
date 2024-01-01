import Label from "../components/Label";
import { useForm } from "react-hook-form";

type Cocktail = {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: Ingredient[];
}

type Ingredient = {
    name: string;
    quantity: string;
    unit: string;
}

const CreateCocktail = () => { 
    const {
        register,
        handleSubmit,
    } = useForm<Cocktail>();
    
    const onSubmit = async (data: Cocktail) => {
        try {
            data.description = "Test description";
            data.imageUrl = "Test image url";

            const response = await fetch('/api/cocktails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Cocktail created');
            } else {
                console.log('Error creating cocktail');
            }
        } catch (error) {
            console.log(error);
        }
    };
      
    return (
        <>
            <div className="flex items-center justify-center content-start w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
                    <div className="mb-4">
                        <Label htmlFor="cocktailName" text="Cocktail navn" />
                        <input id="cocktailName" {...register("name")} placeholder="e.g. Mojito" />
                    </div>
                    <div className="my-4">
                        <Label htmlFor="description" text="Beskrivelse" />
                        <textarea {...register("description")} id="description" className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A delicious cocktail with rum, coconut and pinaple." />
                    </div>
                    <div className="my-4">
                        <Label htmlFor="ingredients" text="Ingredienser" />
                    </div>
                    <div className="my-4">
                        <input type="submit" value="Gem" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCocktail;