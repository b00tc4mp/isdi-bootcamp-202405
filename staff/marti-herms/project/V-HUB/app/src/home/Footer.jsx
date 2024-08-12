import logic from '../../logic'

export default function Footer() {
    const handleAddGame = () => {

    }

    const handleRegisterGame = () => {

    }

    return <footer className='fixed w-screen p-2 bottom-0 left-0 flex flex-row justify-around items-center border border-solid border-t-black'>
        <button className='border border-solid border-black' onClick={handleAddGame}>Add Game</button>
        <button className='border border-solid border-black' onClick={handleRegisterGame}>Register Game</button>
    </footer>
}