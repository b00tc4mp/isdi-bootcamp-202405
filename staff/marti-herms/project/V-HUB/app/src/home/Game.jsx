import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useContext from '../context'

import logic from '../../logic'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Link from '../library/Link'
import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

import Review from './Review'

export default function Game({ makeReviewVisibility, onCancel }) {
    const { alert } = useContext()

    const { gameId } = useParams()

    const [game, setGame] = useState()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        try {
            logic.getGameById(gameId)
                .then(game => {
                    setGame(game)

                    loadReviews()
                })
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
                .then(() => {
                    onCancel()

                    loadReviews()
                })
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
        try {
            logic.getGameReviews(gameId)
                .then(reviews => setReviews(reviews))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {game && <>
            <Container className='flex flex-row items-center gap-4' >
                <Image className='w-32 h-32' src={game.image} alt={game.name} />
                <Container>
                    <Paragraph className='text-white font-semibold text-2xl'>{game.name}</Paragraph>
                    <Paragraph className='text-white font-semibold text-lg'>{game.author.username}</Paragraph>
                </Container>
            </Container>
            <Container className='flex flex-col justify-center'>
                <Paragraph className='text-white font-semibold text-lg'>{game.description}</Paragraph>
                <Link className='text-white font-semibold text-lg text-center hover:text-violet-500 active:text-violet-500:' href={game.link}>Download Here</Link>
            </Container>
        </>}

        {makeReviewVisibility && <Form className='flex h-[20%] my-2 gap-2 justify-start items-center text-black' onSubmit={handleMakeReview}>
            <Input name='comment' placeholder='comment' id='comment-input' />
            <Button className='bg-white' type='submit'>Submit</Button>
        </Form>}

        <Container className='flex flex-col mt-4 mb-10'>
            {reviews && reviews.map(review => <Review key={review.id} review={review} />)}
        </Container>
    </>
}