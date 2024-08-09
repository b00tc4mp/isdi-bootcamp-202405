function Paragraph({ children }) {
    console.debug('Paragraph -> call')

    return <p className="Paragraph">{children}</p>
}

export default Paragraph