export default function Heading({ level = 1, children, ...nextProps }) {
    const Tag = `h${level}`

    return <Tag className="flex m-0 text-[18px]" {...nextProps}>{children}</Tag>

}