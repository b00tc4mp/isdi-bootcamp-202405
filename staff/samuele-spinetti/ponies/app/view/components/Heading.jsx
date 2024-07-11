function Heading({ className, level = 1, children }) {
    const Tag = `h${level}`

    return <Tag className={className}>{children}</Tag>
}

export default Heading