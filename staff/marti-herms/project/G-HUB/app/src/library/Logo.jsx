export default function Logo({ className = '' }) {
    return <div className={'flex flex-col items-center bg-transparent box-content ' + className}>
        <img className='relative top-0 bg-transparent w-[80px] h-[80px]' src='../images/logo.svg' alt='logo' />
        <p className='relative top-[-58px] text-3xl text-gray-800 dark:text-white font-bold z-10 h-0'>G-HUB</p>
    </div>
}