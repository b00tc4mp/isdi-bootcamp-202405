function Button({ onClick, type, children, className = "" }) {
    return <button onClick={onClick} className={`Button ${className}`} type={type}>{children}</button>
}

export default Button