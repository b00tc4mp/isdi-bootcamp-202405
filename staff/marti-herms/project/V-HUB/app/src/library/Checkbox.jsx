import { useState } from "react"

export default function Checkbox({ className = '', id, ...nextProps }) {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
    }

    return <>
        <label htmlFor={id}>
            <input type='checkbox' checked={checked} onChange={handleChange} id={id}  {...nextProps} /> Game Dev
        </label>
    </>
}