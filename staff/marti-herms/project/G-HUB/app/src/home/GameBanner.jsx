import { IoRemoveCircleOutline as RemoveIcon } from 'react-icons/io5'
import { IoIosAddCircleOutline as AddIcon } from 'react-icons/io'
import { MdFavorite as FavIcon, MdFavoriteBorder as NotFavIcon } from "react-icons/md";


import Container from '../library/Container'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

import useContext from '../context'

import logic from '../../logic'

export default function GameBanner({ game, onInteraction, onGameClick, collectionType }) {
    const { alert } = useContext()

    const handleGameClick = () => {
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

    return <article className='flex flex-row items-center border-y border-solid border-black dark:border-slate-700 dark:bg-black'>
        <Button className='bg-transparent border-0' onClick={handleGameClick}>
            <Container className='flex flex-col'>
                <Container className='flex flex-row items-center'>
                    <Image className='w-2/12 h-2/12' src={game.image} />
                    <Paragraph>{game.name}</Paragraph>
                </Container>
                <Container>
                    <Paragraph>{game.description.length >= 25 ? game.description.slice(0, 25) + '...' : game.description}</Paragraph>
                </Container>
            </Container>
        </Button>
        {collectionType !== 'devGames' && <Container className='flex flex-row gap-2 mr-2 h-full w-[90px]'>
            <Button onClick={handleAddGame}>{game.inLibrary ? <RemoveIcon className='w-8 h-8 dark:text-white' /> : <AddIcon className='w-8 h-8 dark:text-white' />}</Button>
            <Button onClick={handleFavGame} disabled={!game.inLibrary}>{game.inFavs ? <FavIcon className='w-8 h-8 text-red-600' /> : <NotFavIcon className='w-8 h-8 text-red-600' />}</Button>
        </Container>}
    </article>
}