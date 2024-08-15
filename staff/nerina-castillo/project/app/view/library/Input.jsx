export default function Input({ id, value, onChange, ...props }) {
    return (
        <input
            id={id}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
}