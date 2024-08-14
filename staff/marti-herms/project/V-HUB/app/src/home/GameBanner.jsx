import Container from '../library/Container'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'

import useContext from '../context'

import logic from '../../logic'

export default function Game({ game, onInteraction, onGameClick }) {
    const { alert } = useContext()

    const handleGameClick = () => {
        // window.location.href = game.link
        onGameClick(game.id)
    }

    const handleAddGame = () => {
        try {
            logic.toggleAddGame(game.id)
                .then(() => onInteraction())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFavGame = () => {
        try {
            logic.toggleFavGame(game.id)
                .then(() => onInteraction())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className='flex flex-row items-center border border-solid border-slate-700 dark:bg-black'>
        <button className='bg-transparent border-0' onClick={handleGameClick}>
            <Container className='flex flex-col'>
                <Container className='flex flex-row items-center'>
                    <Image className='w-2/12 h-2/12' src={game.image} />
                    <Paragraph>{game.name}</Paragraph>
                </Container>
                <Container>
                    <Paragraph>{game.description}</Paragraph>
                </Container>
            </Container>
        </button>
        <Container className='flex flex-col gap-2 mr-2'>
            <button className='bg-gray-500 rounded' onClick={handleAddGame}>{game.inLibrary ? 'Remove' : 'Add'}</button>
            {game.inLibrary && <button className={game.inFavs ? 'bg-red-500 rounded' : 'bg-green-300 rounded'} onClick={handleFavGame}>Fav</button>}
        </Container>
    </article>
}