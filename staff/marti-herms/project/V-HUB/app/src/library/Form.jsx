export default function Form({ className = '', children, onSubmit }) {
    return <form className={'flex flex-col m-auto w-full h-full justify-center items-center rounded-md shadow-md shadow-black ' + className} onSubmit={onSubmit}>{children}</form>
}