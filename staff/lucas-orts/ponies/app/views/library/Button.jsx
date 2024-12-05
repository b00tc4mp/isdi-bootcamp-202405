export default function Button({ children, ...nextProps }) {
    return <button className="bg-transparent border-transparent rounded-lg text-[dimgray] dark:text-white p-0" {...nextProps}>{children}</button>
}