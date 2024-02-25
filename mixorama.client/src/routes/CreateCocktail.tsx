import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import TextArea from "../components/TextArea";
import { useForm, useFieldArray } from "react-hook-form";

const CreateCocktail = () => {
  const [fileUploadError, setFileUploadError] = useState('');
  
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      ingredients: [
        { name: '', quantity: '', unit: '' }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: any) => {
    const requestBody = JSON.stringify(data);
    console.log("Request body", requestBody);

    const response = await fetch('/api/cocktails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: requestBody,
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    console.log("Response", response);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file)
      return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('api/cocktails/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // We need to store the relative URL for later use
        const result = await response.json()
        setValue('imageUrl', result.relativeUrl);
      } else {
        const error = await response.text();
        setFileUploadError(error);
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
    }
  }

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
            <Label htmlFor="image" text="Billede" />
            <input 
              title="Upload image"
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange} />
            { fileUploadError && <p className="text-red-500 text-xs italic">{fileUploadError}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="ingredients" text="Ingredienser" />

            <div className="flex flex-col space-y-3">
              {fields.map((ingredient, index) => (
                <div key={Math.random()} className="flex flex-row space-x-3">
                  <div className="w-full">
                    <Input
                      key={ingredient.id}
                      inputName="ingredientName"
                      type="text"
                      placeholder="Lys rom"
                      {...register(`ingredients.${index}.name`)} />
                  </div>
                  <div className="w-1/3">
                    <Input
                      inputName="ingredientQuantity"
                      type="number"
                      placeholder="60"
                      {...register(`ingredients.${index}.quantity`)} />
                  </div>
                  <div className="w-1/3">
                    <select
                      title="Unit"
                      className="h-full w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="ml">ml</option>
                      <option value="dashes">stænk</option>
                      <option value="stk">stk</option>
                    </select>
                  </div>
                  <div className="w-1/3">
                    <button
                      title="Remove ingredient"
                      type="button"
                      className="h-full w-12 bg-red-500 hover:bg-red-700 text-white font-bold p-3 rounded-xl"
                      hidden={fields.length === 1}
                      onClick={() => remove(index)}>
                      <div className="flex items-center">
                        <img src="trash-icon.png" alt="Fjern ingrediens" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={() => (append({ name: '', quantity: '', unit: '' }))}
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