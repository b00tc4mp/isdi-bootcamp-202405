function Form({ onSubmit, children, className }) {
    return <form className={className} onSubmit={onSubmit}>{children}</form>
}

export default Form