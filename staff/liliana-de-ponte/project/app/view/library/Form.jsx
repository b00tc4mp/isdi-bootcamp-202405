export default function Form({ onSubmit, children, className = '' }) {
    return <form className={`flex flex-col min-w-full gap-2 box-border ${className}`} onSubmit={onSubmit}>{children}</form>
}

