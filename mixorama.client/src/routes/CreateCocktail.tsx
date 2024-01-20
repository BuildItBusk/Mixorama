import FileInput from "../components/FileInput";
import Input from "../components/Input";
import Label from "../components/Label";
import TextArea from "../components/TextArea";
import { useForm, SubmitHandler } from "react-hook-form";

interface Cocktail {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    quantity: string;
    unit: string;
}

const CreateCocktail = () => { 
    const {register, getValues, setValue, watch, handleSubmit} = useForm<Cocktail>({ 
        defaultValues: { 
            name: '',
            description: '',
            imageUrl: '',
            ingredients: [
                {name: '', quantity: '', unit: ''}
            ]
        } 
    });

    const ingridientsList = watch('ingredients')

    const onAddIngredient = () => {
        console.log("Adding ingredient");
        setValue('ingredients', [...getValues('ingredients'), {name: '', quantity: '', unit: ''}])
    }

    const onRemoveIngredient = () => {
        console.log("Removing ingredient");
        setValue('ingredients', [...getValues('ingredients').slice(0, -1)])
    }
    
    const onSubmit: SubmitHandler<Cocktail> = async data => {
        try {
            console.log("Submitting cocktail", data);

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
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-6 my-2">
                    <div className="mb-4">
                        <Label htmlFor="name" text="Cocktail navn" />
                        <Input
                            inputName="cockatailName"
                            placeholder="Pinã Colada"
                            {...register("name")}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description" text="Beskrivelse" />
                        <TextArea 
                            id="cocktailDescription"
                            inputName="description"
                            placeholder="A delicious cocktail with rum, coconut and pinaple."
                            {...register("description")} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="imageUrl" text="Billede" />
                        <FileInput 
                            inputName="imagePath"
                            {...register("imageUrl")} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="ingredients" text="Ingredienser" />
                        
                        <div  className="flex flex-col space-y-3">
                            {ingridientsList.map(() => (
                            <div key={Math.random()} className="flex flex-row space-x-3">
                                <div className="w-full">
                                    <Input
                                        inputName="ingredientName"
                                        placeholder="Lys rom" />
                                </div>
                                <div className="w-1/3">
                                <Input 
                                    inputName="ingredientQuantity"
                                    placeholder="60" />
                                </div>
                                <div className="w-1/3">
                                    <select
                                        className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="ml">ml</option>
                                        <option value="dashes">stænk</option>
                                        <option value="stk">stk</option>    
                                    </select>
                                </div>
                                <button type="button" className="p-0 w-12 bg-transparent" onClick={onRemoveIngredient}>
                                    <div className="flex items-center">
                                        <img src="trash-icon.png"/>
                                    </div>
                                </button>
                            </div>
                            ))} 
                            <div>
                                <button 
                                    type="button"
                                    onClick={onAddIngredient}
                                    className="w-full bg-transparent border-2 border-dashed border-blue-500">Tilføj ingrediens</button>
                            </div>
                        </div> 
                                            
                    </div>
                    <div className="mb-4">
                        <input type="submit" 
                            value="Gem" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" 
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCocktail;