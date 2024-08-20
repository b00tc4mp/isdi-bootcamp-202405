export default function NavigationButton({ children, ...nextProps }) {
    return <button className={'border border-solid border-slate-500 bg-white px-2 rounded active:bg-slate-500 w-[95px]'} {...nextProps}>{children}</button>
}