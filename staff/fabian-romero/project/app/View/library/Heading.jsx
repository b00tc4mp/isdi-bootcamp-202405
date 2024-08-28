export default function Heading({ level = 2, children, ...nextProps }) {
    console.debug('Heading -> call')

    const Tag = `h${level}`

    return <Tag className="m-0" {...nextProps}>{children}</Tag>
}