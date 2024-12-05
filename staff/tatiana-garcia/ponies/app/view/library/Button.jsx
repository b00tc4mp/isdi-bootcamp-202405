export default function Button({ children, className = '', ...nextProps }) {
    console.debug('Button -> call')

    return <button className={` ${className}`} {...nextProps}>{children}</button>
}