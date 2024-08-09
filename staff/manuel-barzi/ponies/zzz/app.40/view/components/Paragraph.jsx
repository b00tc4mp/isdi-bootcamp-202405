export default function Paragraph({ children }) {
    console.debug('Paragraph -> call')

    return <p className="m-2">{children}</p>
}