function Button(props) {
    return <button className="Button" type={props.type} onClick={props.onClick}>{props.children}</button>
}
export default Button