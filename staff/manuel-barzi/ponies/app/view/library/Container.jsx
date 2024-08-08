export default function Container({ children, className = '' }) {
    console.debug('Container -> call')

    return <div className={`flex gap-2 p-[0_.5rem] ${className}`}>{children}</div>
}