export default function Link({ onClick, children, className, href }) {
    return <a href={href} className={`${className}`} onClick={onClick} > {children}</a >
}