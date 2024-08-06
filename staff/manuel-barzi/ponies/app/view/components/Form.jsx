import './Form.css'

function Form({ children, className = '', ...nextProps }) {
    console.debug('Form -> call')

    return <form className={`Form ${className}`} {...nextProps}>{children}</form>
}

export default Form