export default function Form({ children, className = '', ...nextProps }) {
    console.debug('Form -> call')

    return <form className={`flex p-2 gap-2 ${className}`} {...nextProps}>{children}</form>
}