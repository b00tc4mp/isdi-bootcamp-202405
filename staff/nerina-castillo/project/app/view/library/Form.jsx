export default function Form({ children, className = '', ...nextProps }) {
    return <form className={`flex flex-col min-w-full px-4 text-[16px] gap-2 ${className}`} {...nextProps}
    >
        {children}

    </form>

}