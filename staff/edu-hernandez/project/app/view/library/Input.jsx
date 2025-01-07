function Input({ className = '', ...nextProps }) {
    // console.debug('Input -> call')

    return <input className={`autofill:bg-[yellow]-200 enabled:hover:border-gray-400 disabled:opacity-75 border-[lightgray] border-[1px] rounded-[.25rem] text-black w-full px-[.5rem] ${className}`} {...nextProps} />
}

export default Input