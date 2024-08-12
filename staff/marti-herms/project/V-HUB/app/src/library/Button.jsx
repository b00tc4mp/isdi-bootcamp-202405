export default function Button({ className = '', children, ...nextProps }) {
    return <button className={className + 'w-8/12 h-16 text-4xl text-black rounded-md border border-solid border-black shadow-md shadow-black '} {...nextProps}>{children}</button>
}