function Button(props) {
    console.debug('Button -> call')

    const { type, onClick, children } = props

    return <button className="Button" type={type} onClick={onClick}>{children}</button>
}

export default Button