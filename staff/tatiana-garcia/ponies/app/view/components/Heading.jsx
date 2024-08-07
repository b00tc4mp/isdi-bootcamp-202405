export default function Heading({ level = 1, children, className = "" }) {
    console.debug('Heading -> call')
    const Tag = `h${level}`

    return <Tag className={` ${className}`}>{children}</Tag>
}