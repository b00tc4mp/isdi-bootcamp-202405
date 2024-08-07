export default function Container({ type, children }) {
    if (type === 1) {
        return <div className={'flex flex-col items-center justify-center bg-[#1e1e1e] text-white w-1/3 h-full'}>{children}</div>
    } else if (type === 2) {
        return <div className={'flex flex-col items-center justify-center bg-[#1e1e1e] text-white w-2/3 h-full'}>{children}</div>
    }
}