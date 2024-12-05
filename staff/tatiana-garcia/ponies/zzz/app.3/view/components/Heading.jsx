function Heading({ level = 1, children }) {
    console.debug('Heading -> call')
    const Tag = `h${level}`

    return <Tag className="Heading">{children}</Tag>
}

export default Heading