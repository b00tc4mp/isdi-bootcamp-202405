function Form({ onSubmit, children, className = '' }) {
    return <form className={`Form ${className}`} onSubmit={onSubmit}>{children}</form>
}

export default Form