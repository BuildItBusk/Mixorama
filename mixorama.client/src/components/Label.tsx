type LabelProps = {
    htmlFor: string;
    text: string;
}

const Label = (props: LabelProps) => {
    return (
        <label 
            htmlFor={props.htmlFor} 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props.text}
        </label>
    )
}

export default Label;