export default function Heading({ level = 1, children, className = "", ...nextProps }) {
    console.debug('Heading -> call')
    const Tag = `h${level}`

    return <Tag className={` ${className}`} {...nextProps}>{children}</Tag>
}