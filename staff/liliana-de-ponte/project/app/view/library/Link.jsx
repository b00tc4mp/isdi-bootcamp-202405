export default function Link({ onClick, children, className }) {
    return <a href="#" className={`${className}`} onClick={onClick} > {children}</a >
}