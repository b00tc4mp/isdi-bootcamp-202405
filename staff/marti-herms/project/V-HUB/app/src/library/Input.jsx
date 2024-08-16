export default function Input({ className = '', ...nextProps }) {
    return <input className={className + ' w-10/12 h-10 px-3 text-2xl text-black rounded-md border border-solid border-black shadow-md shadow-black'} {...nextProps} />
}