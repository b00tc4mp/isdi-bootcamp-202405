import './Input.css'

function Input({ id, defaultValue, value, type, name, placeholder, className = '', onChange }) {
    console.debug('Input -> call')

    return <input className={`Input ${className}`} id={id} defaultValue={defaultValue} value={value} type={type} name={name} placeholder={placeholder} onChange={onChange} />
}

export default Input