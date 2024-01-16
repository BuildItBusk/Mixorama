import { HTMLProps, forwardRef } from "react";
import { FieldValues, FieldPath } from "react-hook-form";

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    id: string;
    inputName: FieldPath<FieldValues>;
    placeholder: string;
}   

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
    { id, inputName, placeholder, ...rest }, ref) => {
    return(
        <textarea 
            id={id}
            name={inputName as string}
            {...rest}
            ref={ref}
            className="resize-none block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A delicious cocktail with rum, coconut and pinaple." />
        )
});

export default TextArea; 