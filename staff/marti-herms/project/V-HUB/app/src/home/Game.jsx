import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useContext from '../context'

import logic from '../../logic'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Link from '../library/Link'

export default function Game({ makeReviewVisibility, onCancel }) {
    const { alert } = useContext()

    const { gameId } = useParams()

    const [game, setGame] = useState()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        try {
            logic.getGameById(gameId)
                .then(game => setGame(game))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleMakeReview = (event) => {
        event.preventDefault()

        const form = event.target

        const commentInput = form['comment-input']

        const comment = commentInput.value

        try {
            logic.makeReview(gameId, comment)
                .then(() => onCancel())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const loadReviews = () => {

    }

    return <>
        {game && <>
            <div className='flex flex-row items-center gap-4' >
                <img className='w-32 h-32' src={game.image} alt={game.name} />
                <div>
                    <p className='text-white font-semibold text-2xl'>{game.name}</p>
                    <p className='text-white font-semibold text-lg'>{game.author.username}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center'>
                <p className='text-white font-semibold text-lg'>{game.description}</p>
                <Link className='text-white font-semibold text-lg text-center hover:text-violet-500 active:text-violet-500:' href={game.link}>Download Here</Link>
            </div>
        </>}

        {makeReviewVisibility && <Form className='flex h-[20%] my-2 gap-2 justify-start items-center text-black' onSubmit={handleMakeReview}>
            <Input name='comment' placeholder='comment' id='comment-input' />
            <Button className='bg-white' type='submit'>Submit</Button>
        </Form>}
    </>
}