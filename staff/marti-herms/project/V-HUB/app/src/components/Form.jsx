export default function Form({ className = '', children, onSubmit }) {
    return <form className={'flex flex-col m-auto bg-[#616161] w-[500px] h-5/6 justify-center items-center rounded-md shadow-md shadow-black ' + className} onSubmit={onSubmit}>{children}</form>
}