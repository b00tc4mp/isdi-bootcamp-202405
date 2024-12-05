function Button(props) {
    const { type, onClick, children } = props
    return <button className="Button" type={type} onClick={onClick}>{children}</button>
}

export default Button