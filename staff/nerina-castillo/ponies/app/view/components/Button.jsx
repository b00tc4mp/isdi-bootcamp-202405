
function Button({ type, onClick, children, className = '' }) {
    return <button className={`Button ${className}`}
        onClick={onClick}
        type={type}
    >
        {children}
    </button>
}


export default Button