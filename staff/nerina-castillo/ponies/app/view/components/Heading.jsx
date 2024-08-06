export default function Heading({ level = 1, children }) {
    const Tag = `h${level}`

    return <Tag className="m-0 px-0 font-bold text-lg" >
        {children}
    </Tag>
}

