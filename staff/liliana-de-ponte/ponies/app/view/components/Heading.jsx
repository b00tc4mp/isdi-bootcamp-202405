export default function Heading({ level = 1, children }) {
    const Tag = `h${level}`

    return <Tag className="m-0 color-[f981fb] text-[18px] "> {children}</Tag >
}
