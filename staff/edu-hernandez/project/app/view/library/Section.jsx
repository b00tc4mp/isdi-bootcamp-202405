export default function Section({ children, className = '' }) {
    // console.debug('section -> call')

    return <div className={`${className}`}>{children}</div>
}