function Container({ children }) {
    console.debug('Container -> call')

    return <div className="Container">{children}</div>
}

export default Container