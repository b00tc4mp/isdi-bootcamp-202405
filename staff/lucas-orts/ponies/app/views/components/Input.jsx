import './Input.css'

function Input({ id, type, defaultValue, name, placeholder }) {
    return <input className="Input" id={id} type={type} defaultValue={defaultValue} name={name} placeholder={placeholder} />
}

export default Input