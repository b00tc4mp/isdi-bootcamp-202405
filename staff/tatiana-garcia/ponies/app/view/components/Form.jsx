export default function Form({ children, className = '', ...nextProps }) {
    console.debug('Form -> call')

    return <form className={`flex p-[0_.5rem_.5rem_.5rem] gap-2 min-w[80%] mb-[0%] flex-col ${className}`} {...nextProps}>{children}</form>
}