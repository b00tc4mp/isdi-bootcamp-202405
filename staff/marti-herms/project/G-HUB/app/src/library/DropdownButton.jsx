export default function DropdwonButton({ onClick, children }) {
    return <button className='w-full h-[50px] bg-black text-white text-xl font-bold border border-solid border-slate-700' onClick={onClick}>{children}</button>

}