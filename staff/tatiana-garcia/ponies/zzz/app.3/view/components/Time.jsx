function Time({ children }) {
    console.debug('Time -> call')

    return <time className="Time">{children}</time>
}

export default Time