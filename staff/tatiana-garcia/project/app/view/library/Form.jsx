export default function Form({ children, className = '', ...nextProps }) {
    return <form className={` ${className}`} {...nextProps}>{children}</form>
}

// flex p-[0_.5rem_.5rem_.5rem] gap-2 min-w[80%] mb-[0%]