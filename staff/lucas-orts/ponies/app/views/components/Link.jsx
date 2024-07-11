function Link({ href, onClick, children }) {
    return <a href={href} onClick={onClick}> {children}</a>
}

export default Link