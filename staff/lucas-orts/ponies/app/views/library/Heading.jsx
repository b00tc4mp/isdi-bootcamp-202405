export default function Heading({ level = 1, children, ...nextProps }) {
    const Tag = `h${level}`

    return <Tag className="m-0" {...nextProps}>{children}</Tag>
}