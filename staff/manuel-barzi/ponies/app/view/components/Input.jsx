import './Input.css'

function Input({ className = '', ...nextProps }) {
    console.debug('Input -> call')

    return <input className={`Input ${className}`} {...nextProps} />
}

export default Input