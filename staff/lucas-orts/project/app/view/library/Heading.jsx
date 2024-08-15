export default function Heading({ level = 1, children, ...nextProps }) {
    const Tag = `h${level}`

    return <Tag {...nextProps}>{children}</Tag>
}