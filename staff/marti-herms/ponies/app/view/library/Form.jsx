export default function Form({ onSubmit, children, className = '' }) {
    return <form className={`p-0 flex flex-wrap justify-center gap-2 box-content ${className}`} onSubmit={onSubmit}>{children}</form>
}