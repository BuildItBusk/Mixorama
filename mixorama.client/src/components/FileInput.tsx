import { HTMLProps, forwardRef } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
    inputName: FieldPath<FieldValues>;
  }

const FileInput = forwardRef<HTMLInputElement, InputProps>(({ inputName, ...rest }, ref) => {
  return (
    <>
      <input 
        name={inputName as string}
        {...rest}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        aria-describedby="file_input_help" 
        id="file_input" 
        type="file" />                    
    </>
  );
});

export default FileInput;