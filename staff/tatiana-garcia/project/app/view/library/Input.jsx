export default function Input({ className = '', ...nextProps }) {
    console.debug('Input -> call')

    return <input className={`${className}`} {...nextProps} />
}