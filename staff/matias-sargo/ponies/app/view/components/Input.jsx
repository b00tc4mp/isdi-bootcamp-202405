function Input({ className = '', ...nextProps }) {
    console.debug('Input -> call');
  
    // Base input classes
    const inputBaseClasses = `
      font-sans max-w-xs px-3.5 py-3
      text-base border border-black
      rounded-md shadow-[2.5px_3px_0px_rgba(0,0,0,1)]
      outline-none transition-all duration-200
      focus:shadow-[5.5px_7px_0px_rgba(0,0,0,1)]
    `;
  
    return (
      <input className={`${inputBaseClasses} ${className}`} {...nextProps} />
    );
  }
  
  export default Input;