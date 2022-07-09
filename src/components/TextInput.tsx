function TextInput(props: { value: string, onChange(v: string): void, textArea?: boolean, type?: string }) {
    if (props.textArea) {
        return <textarea value={props.value}
                         className="w-full p-2 border-2 border-gray-100 h-64 hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none transition-all"
                         onChange={(e) => props.onChange(e.target.value)}></textarea>;
    }

    return <input
        className="w-full p-2 border-2 border-gray-100 hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none transition-all"
        value={props.value} type={props.type} onChange={e => props.onChange(e.target.value)}/>
}

export default TextInput;
