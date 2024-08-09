export default function Button({ children, ...nextProps }) {
    console.debug('Button -> call')

    return <button className="bg-transparent border-transparent rounded-lg text-[dimgray] p-0" {...nextProps}>{children}</button>
}