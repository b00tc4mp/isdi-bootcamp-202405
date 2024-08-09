export default function Button({ children, className = '', ...nextProps }) {
    return <button className={`bg-[white]  text-[black] rounded-[5px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] pt-1 pb-1 pr-2 pl-2 ${className}`}{...nextProps}

    >
        {children}
    </button>
}
