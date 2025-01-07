export default function Button({ children, ...nextProps }) {
    // console.debug('Button -> call')

    return <button className="text-gray-600 cursor-pointer" {...nextProps}>{children}</button>
}