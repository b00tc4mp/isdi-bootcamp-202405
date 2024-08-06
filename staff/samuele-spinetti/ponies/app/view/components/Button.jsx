function Button({ children, ...nextPorps }) {
    return <button {...nextPorps}>{children}</button>
}

export default Button