export default function Register() {
    return <main className='flex flex-row w-screen h-screen'>
        <div className='flex-1 flex-col items-center justify-center bg-[#1e1e1e] text-white w-1/3 h-full'>
            <img className='top-3 w-72 h-72' src='../images/logo.svg' alt='logo' />
            <h2 className='text-center text-7xl'>V-HUB</h2>
        </div>
        <div className='bg-[#4177FF] w-1.5 h-full'></div>
        <div className='flex bg-[#1e1e1e] text-white w-2/3 h-full'>
            <form action='' className='flex flex-col m-auto bg-[#616161] w-10/12 h-5/6 justify-center items-center gap-8 rounded-md shadow-md shadow-black'>
                <input className='w-10/12 h-20 px-3 text-4xl text-black rounded-md border border-solid border-black shadow-md shadow-black' type='text' placeholder='Username' />
                <input className='w-10/12 h-20 px-3 text-4xl text-black rounded-md border border-solid border-black shadow-md shadow-black' type='text' placeholder='Email' />
                <input className='w-10/12 h-20 px-3 text-4xl text-black rounded-md border border-solid border-black shadow-md shadow-black' type='text' placeholder='Password' />
                <input className='w-10/12 h-20 px-3 text-4xl text-black rounded-md border border-solid border-black shadow-md shadow-black' type='text' placeholder='Repeat Password' />
                <button className='w-8/12 h-16 text-4xl text-black rounded-md border border-solid border-black bg-rose-500 shadow-md shadow-black' >Register</button>
            </form>
        </div>
    </main>
}