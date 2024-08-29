import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

import useContext from '../context'

import logic from '../../logic/index.js'

import Container from '../library/Container'
import Header from '../home/Header'
import Footer from '../home/Footer'
import Link from '../library/Link.jsx'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button.jsx'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form.jsx'

import Review from './Review.jsx'
import extractPayloadFromToken from '../../util/extractPayLoadFromToken.js'

export default function PetsitterDetails({ handleLoginClick }) {
    const { alert } = useContext()
    const { petsitterId } = useParams()


    const [petsitter, setPetsitter] = useState(null)
    const [reviews, setReviews] = useState([])
    const [userRole, setUserRole] = useState(null)
    const [rating, setRating] = useState(0)
    const [value, setValue] = useState(0)
    const [addReviewVisibility, setAddReviewVisibility] = useState(false)


    const onLoginClick = () => handleLoginClick()

    const onAddReviewClick = () => {
        setAddReviewVisibility(true)
    }

    const onCancelReviewClick = () => {
        setAddReviewVisibility(false)
    }

    const onReviewSubmit = (event) => {
        const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

        event.preventDefault()

        const form = event.target

        const commentInput = form['comment-input']
        const ratingInput = form['rating-input']

        const comment = commentInput.value
        const rate = parseInt(ratingInput.value)

        try {
            logic.addReview(userId, petsitterId, comment, rate || 0)
                .then(() => {
                    onCancelReviewClick()

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

    const handleDeletePetsitterReview = (reviewId) => {
        try {
            logic.deletePetsitterReview(reviewId)
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
            logic.getPetsitterReview(petsitterId)
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

        const rating = ratings.length > 0
            ? ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratings.length
            : 0

        setRating(rating || 0)
    }

    useEffect(() => {
        try {
            logic.getPetsitterDetails(petsitterId)
                .then(petsitter => {
                    setPetsitter(petsitter)

                    loadReviews()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            if (logic.isUserLoggedIn()) {
                const role = logic.getUserRole()
                setUserRole(role)
            }

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [petsitterId, alert])

    useEffect(() => calculateRating(), [reviews])

    return (<>
        <Header />
        <main className='bg-teal-100 h-screen mt-16 mb-12 flex flex-col items-center justify-start gap-4 text-[1.5rem] overflow-y-auto'>
            <Container className='text-center mb-4'>
                <Heading className='text-2xl font-bold'>Guardería</Heading>
            </Container>
            {petsitter != null ? (
                <Container className='text-lg bg-white p-3 mt-0 rounded-[50px] shadow-lg overflow-y-auto max-h-[80vh]'>
                    <Container className='flex items-center mb-4'>
                        <img src={petsitter.image} alt='imagen guarderia' className='h-24 w-24 rounded-[15px] mr-4 p-2 ml-3' />

                        <Container className='flex flex-col'>
                            <Heading className='text-base font-bold'>{petsitter.name}</Heading>
                            <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>{petsitter.city}</Paragraph>
                            <Container className='flex flex-row items-center'>
                                <Rating name='read-only' value={rating} precision={0.25} size='small' emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />} readOnly />
                                <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>{rating.toFixed(1)}</Paragraph>
                            </Container>
                        </Container>
                    </Container>

                    <Container>
                        <Paragraph className=' flex flex-col text-sm text-gray-700 mb-4'>{petsitter.description}</Paragraph>
                    </Container>

                    {
                        userRole === 'regular' ? (
                            <Container className='font-bold text-lg p-1 flex flex-row space-x-2'>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200'>Contáctame</Button>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200' onClick={onAddReviewClick}>Valórame</Button>
                            </Container>

                        ) : (
                            <Link className='text-xs font-bold ' onClick={onLoginClick}>Loguéate para contactar o valorar a tu guardería</Link>
                        )
                    }

                    <Container>
                        <Heading className='items-start justify-start flex flex-row text-xl font-bold '>⭐ Reseñas</Heading>
                        <Container className='flex flex-col max-h-48 space-y-4'>
                            {reviews.map(review => (
                                <Review key={review.id} review={review} onDelete={handleDeletePetsitterReview} />
                            ))}
                        </Container>
                    </Container>
                </Container>

            ) : (

                <Container >
                    <Paragraph>Cargando...</Paragraph>
                </Container>

            )}
            <Container>
                <Footer defaultTab={'petsitters'} />
            </Container>

            {addReviewVisibility && <>
                <Container className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 flex items-center justify-center'>

                    <Form className='bg-white p-6 border border-black rounded-[25px] flex flex-col items-center w-11/12 max-w-md' onSubmit={onReviewSubmit}>
                        <Label className='text-black text-center font-bold mb-4'>Da tu opinión sobre {petsitter?.name}</Label>
                        <Container className='mb-4 w-full'>
                            <Input className='bg-gray-200 w-full p-2 rounded' type='text' id='' name='comment-input' placeholder='escribe aquí tu reseña' />
                        </Container>
                        <Container className='flex justify-center'>
                            <Rating name='rating-input'
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                size='large'
                                emptyIcon={<StarIcon style={{ opacity: 1, color: 'grey' }} fontSize='inherit' />} />
                        </Container>
                        <Container className='flex justify-between mt-4 w-full'>
                            <Button type='button' className='w-28 bg-red-400 text-white rounded-full hover:bg-red-500 transition duration-200' onClick={onCancelReviewClick}>Cancelar</Button>
                            <Button type='submit' className='w-28 bg-green-400 text-white rounded-full hover:bg-green-500 transition duration-200'>Enviar</Button>
                        </Container>
                    </Form>
                </Container>
            </>}
        </main >
    </>
    )
}