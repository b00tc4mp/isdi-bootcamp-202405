import './Input.css'

function Input({ id, defaultValue, type, name, placeholder, className = '' }) {
    return <input className={`Input ${className}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue} />

}


export default Input