export default function Form({ children, className = '', ...nextProps }) {
    return <form className={`flex flex-col min-widht-full px-0 text-[16px] gap-px-[1px] ${className}`} {...nextProps}
    >
        {children}

    </form>

}

