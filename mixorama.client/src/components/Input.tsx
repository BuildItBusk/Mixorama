import { forwardRef, HTMLProps } from 'react';
import { FieldValues, FieldPath } from 'react-hook-form';

interface InputProps extends HTMLProps<HTMLInputElement> {
  inputName: FieldPath<FieldValues>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ inputName, ...rest }, ref) => {
  return (
      <input 
        name={inputName as string} 
        placeholder="Jane" 
        {...rest} 
        ref={ref}
        className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
  );
});

export default Input;