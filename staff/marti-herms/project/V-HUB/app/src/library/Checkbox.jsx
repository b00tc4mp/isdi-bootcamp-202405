export default function Checkbox({ className = '', id, ...nextProps }) {
    return <>
        <label htmlFor={id}>
            <input type='checkbox' id={id}  {...nextProps} /> Game Dev
        </label>
    </>
}