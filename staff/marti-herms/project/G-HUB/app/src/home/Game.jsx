import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { IoIosSend as SendIcon } from 'react-icons/io'

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
    const [rating, setRating] = useState(0)
    const [value, setValue] = useState(2)

    useEffect(() => {
        if (gameId.length >= 10)
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

    useEffect(() => calculateRating(), [reviews])

    const handleMakeReview = (event) => {
        event.preventDefault()

        const form = event.target

        const commentInput = form['comment-input']
        const ratingInput = form['rating-input']

        const comment = commentInput.value
        const rate = parseInt(ratingInput.value)

        try {
            logic.makeReview(gameId, comment, rate || 0)
                .then(() => {
                    console.log('hello')

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

    const handleDeleteReview = (reviewId) => {
        try {
            logic.deleteReview(reviewId)
                .then(() => loadReviews())
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

    const calculateRating = () => {
        const reviewsWithRatings = reviews.filter(review => review.rate > 0)

        const ratings = reviewsWithRatings.map(review => review.rate)

        const rating = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratings.length

        setRating(rating || 0)
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
            <Container className='flex flex-col justify-center pl-2'>
                <Paragraph className='text-white font-semibold text-lg ml-0 text-wrap'>{game.description}</Paragraph>
                <Container className='flex flex-row justify-center items-center'>
                    <Rating
                        name='read-only'
                        value={rating}
                        precision={0.25}
                        size='large'
                        emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />}
                        readOnly />
                    <Paragraph>{rating}</Paragraph>
                </Container>
                <Link className='text-white font-semibold text-lg text-center hover:text-violet-500 active:text-violet-500:' href={game.link}>Go to official page</Link>
            </Container>
        </>}
        <Container className='flex flex-col mt-4' style={{ marginBottom: makeReviewVisibility ? '140px' : '60px' }}>
            {reviews && reviews.map(review => <Review key={review.id} review={review} onDelete={handleDeleteReview} />)}
        </Container>
        {makeReviewVisibility && <Form className='fixed bottom-[60px] flex flex-row w-full h-auto p-1 dark:bg-[#1e1e1e] justify-start items-center box-content text-black' onSubmit={handleMakeReview}>
            <Container className='flex flex-col justify-center items-center box-content w-[80%]'>
                <Input name='comment' placeholder='comment' id='comment-input' />
                <Container className='flex flex-row'>
                    <Rating name='rating-input'
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        size='large'
                        emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />} />
                </Container>
            </Container>
            <Button type='submit'><SendIcon className='w-10 h-10 dark:text-white' /></Button>
        </Form>}
    </>
}