import './Form.css'

function Form({ onSubmit, children, className = '' }) {
    console.debug('Form -> call')
    return <form className={`Form ${className}`} onSubmit={onSubmit}>{children}</form>
}

export default Form