export default function Form({ children, className = '', ...nextProps }) {
    console.debug('Form -> call')

    return <form className={`flex p-2 gap-1 rounded-full ${className}`} {...nextProps}>{children}</form>
}