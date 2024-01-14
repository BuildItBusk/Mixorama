import FileInput from "../components/FileInput";
import Input from "../components/Input";
import Label from "../components/Label";
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
    const {register, handleSubmit} = useForm({ 
        defaultValues: { 
            name: '',
            description: '',
            imageUrl: '',
            ingredients: []
        } 
    });
    
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
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
                    <div className="mb-4">
                        <Label htmlFor="name" text="Cocktail navn" />
                        <Input
                            inputName="cockatailName"
                            placeholder="Mojito"
                            {...register("name")}
                        />
                    </div>
                    <div className="mb-4">
                    <textarea 
                        id="description"
                        className="resize-none block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A delicious cocktail with rum, coconut and pinaple." />
                    </div>
                    <div className="mb-4">
                        <FileInput 
                            inputName="imagePath"
                            {...register("imageUrl")} />
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