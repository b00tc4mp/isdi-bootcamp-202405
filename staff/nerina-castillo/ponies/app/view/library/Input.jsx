function Input({ className = '', ...nextProps }) {
    return <input className={`text-[inherit] rounded-[5px] border-[none] px-[.5rem] shadow-[0_4px_8px_rgba(0,0,0,0.2)] text-black ${className}`} {...nextProps} />

}

export default Input