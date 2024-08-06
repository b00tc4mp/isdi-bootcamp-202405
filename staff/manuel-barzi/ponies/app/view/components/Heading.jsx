export default function Heading({ level = 1, children }) {
    console.debug('Heading -> call')

    const Tag = `h${level}`

    return <Tag className="m-0">{children}</Tag>
}