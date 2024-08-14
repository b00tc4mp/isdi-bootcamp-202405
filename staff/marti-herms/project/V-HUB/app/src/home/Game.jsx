import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useContext from '../context'

import logic from '../../logic'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function Game({ makeReviewVisibility, onCancel }) {
    const { alert } = useContext()

    const { gameId } = useParams()

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadReviews()
    }, [makeReviewVisibility])

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
        {makeReviewVisibility && <Form className='flex h-[20%] my-2 gap-2 justify-start items-center text-black' onSubmit={handleMakeReview}>
            <Input name='comment' placeholder='comment' id='comment-input' />
            <Button className='bg-white' type='submit'>Submit</Button>
        </Form>}
    </>
}