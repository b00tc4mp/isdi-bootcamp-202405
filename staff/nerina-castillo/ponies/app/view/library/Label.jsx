export default function Label({ htmlFor, children }) {
    return <label className="text-[dimgray]"
        htmlFor={htmlFor}>
        {children}
    </label>

}

