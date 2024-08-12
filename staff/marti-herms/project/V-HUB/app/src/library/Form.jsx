export default function Form({ className = '', children, onSubmit }) {
    return <form className={'flex flex-col w-full h-full justify-between items-center ' + className} onSubmit={onSubmit}>{children}</form>
}