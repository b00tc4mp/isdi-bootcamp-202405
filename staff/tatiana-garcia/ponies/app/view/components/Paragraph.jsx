export default function Paragraph({ children }) {
    console.debug('paragraph -> call')
    return <p className="m-2" >{children}</p>
}