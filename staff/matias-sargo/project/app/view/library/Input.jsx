function Input({ className = '', ...nextProps }) {
    console.debug('Input -> call')

    return <input className={`border-[#ededed] border-[1px] rounded-[.25rem] text-black w-full px-[.5rem] ${className}`} {...nextProps} />
}

export default Input