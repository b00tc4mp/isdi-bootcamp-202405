function Button({ type, onClick, children }) {
    console.debug("Button -> call");
  
    return (
      <button
        className="relative inline-flex items-center justify-center px-2 py-1 border-2 border-pink-300 bg-pink-100 text-brown-800 text-xl font-bold rounded-full cursor-pointer overflow-hidden outline-none transition-all duration-400 ease hover:bg-violet-200 hover:border-gray-500 hover:text-white focus:outline-none"
        type={type}
        onClick={onClick}
      >
        <span className="absolute inset-0 bg-white opacity-25 rounded-full transition-transform duration-500 ease-out scale-0 group-hover:scale-110"></span>
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
  
  export default Button;
  