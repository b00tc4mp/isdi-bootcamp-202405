function Container({ children, ...nextProps }) {
    return <div {...nextProps}>{children}</div>
}

export default Container