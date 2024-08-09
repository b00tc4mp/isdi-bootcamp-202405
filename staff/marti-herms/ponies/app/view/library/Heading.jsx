export default function Heading({ level = 1, className, children }) {
    const Tag = `h${level}`

    return <Tag className={`m-0 ${className}`}>{children}</Tag>
}