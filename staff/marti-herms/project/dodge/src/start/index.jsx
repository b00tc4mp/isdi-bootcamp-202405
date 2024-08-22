import Container from '../library/Container'
import Button from '../library/Button'

export default function StartPage({ onStartClick, setUsername }) {
    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']

        const username = usernameInput.value

        sessionStorage.username = username

        setUsername(username)

        onStartClick()
    }

    return <main className='h-full w-full flex flex-col justify-center items-center gap-10'>
        <h1 className='text-white text-4xl underline font-mono'>DODGE</h1>
        {/* <img src='../../images/space_invaders_icon.svg' alt='sapce invaders icon' className='w-[50%] h-auto dark:invert' /> */}
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
            <input type='text' id='username-input' placeholder='username' className='p-3 text-xl' />
            <Button className='text-white bg-blue-400 rounded w-20 p-3' type='submit'>Start</Button>
        </form>
    </main>
}