import './Button.css'

function Button({ type, onClick, children }) {
    console.debug('Button -> call')

    return <button className="Button" type={type} onClick={onClick}>{children}</button>
}

export default Button