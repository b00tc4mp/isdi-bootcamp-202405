function Button(props) {
    console.debug('Button -> call')

    return <button className="Button" type={props.type} onClick={props.onClick}>{props.children}</button>
}

export default Button