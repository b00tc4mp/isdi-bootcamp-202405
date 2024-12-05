import './Button.css'

function Button({ type, onClick, children, className = '' }) {
    console.debug('Button -> call')

    return <button className={`Button ${className}`} type={type} onClick={onClick} >{children}</button>
}

export default Button