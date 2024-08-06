import './Button.css'

function Button({ children, ...nextProps }) {
    console.debug('Button -> call')

    return <button className="Button" {...nextProps}>{children}</button>
}

export default Button