function Link({ children, ...nextProps }) {
    console.debug('Link -> call')

    return <a href="#" {...nextProps}>{children}</a>
}

export default Link