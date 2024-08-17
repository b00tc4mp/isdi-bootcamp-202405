export default function Form({ className = '', children, onSubmit }) {
    return <form className={className + ' flex flex-col w-full'} onSubmit={onSubmit}>{children}</form>
}