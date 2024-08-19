export default function Link({ onClick, className = '', children }) {
    return <a href='#' className={`${className}`} onClick={onClick}>{children}</a>
}