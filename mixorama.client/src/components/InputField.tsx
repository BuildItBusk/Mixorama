import { ChangeEventHandler } from "react";

type InputFieldProps = {
    id: string;
    name: string;
    placeholder: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = (props: InputFieldProps) => {
    return (
        <input 
            type="name"
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder={props.placeholder} 
            required />
    );
}

export default InputField;