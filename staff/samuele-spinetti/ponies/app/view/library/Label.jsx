function Label({ children, ...nextProps }) {
    return <label {...nextProps}> {children}</label >
}

export default Label