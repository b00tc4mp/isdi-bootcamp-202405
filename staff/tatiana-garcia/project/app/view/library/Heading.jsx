export default function Heading({ level = 1, children, className = "", ...nextProps }) {
    return <Tag className={`${className}`} {...nextProps}>{children}</Tag>
}