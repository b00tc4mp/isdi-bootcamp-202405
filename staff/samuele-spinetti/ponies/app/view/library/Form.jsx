function Form({ children, ...nextProps }) {
    return <form {...nextProps}>{children}</form>
}

export default Form