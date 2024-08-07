export default function Label({ className = '', children, ...nextProps }) {
    return <label className={"flex flex-col text-[rgb(60,9,44)] gap-0.5 font-bold font-serif rounded-[3px]"} {...nextProps}>{children}</label>

}

