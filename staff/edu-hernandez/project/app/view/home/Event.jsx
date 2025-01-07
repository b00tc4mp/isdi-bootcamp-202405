import { useState, useEffect } from 'react'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import useContext from '../context.js'
import logic from '../../logic'
import getUserId from '../../logic/getUserId'
import eventTime from '../../util/eventTime'
import formatDate from '../../util/formatDate'

import Button from '../library/Button'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'
import Avatar from './Avatar'

export default function Event({ event, onEventDeleted, onEventEdited, onEventFavToggled, onEventGoingToggled }) {
    // console.debug('Event -> call')
    const { alert } = useContext()

    const [showFullCaption, setShowFullCaption] = useState(false)
    const captionLimit = 100
    const truncatedCaption = event.caption.length > captionLimit ? event.caption.substring(0, captionLimit) + '...' : event.caption

    const [editEventVisible, setEditEventVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [newReview, setNewReview] = useState({ rating: '', comment: '' })
    const [error, setError] = useState(null)

    const handleDeleteEventClick = () => setConfirmMessage('Delete Event?')

    const handleDeleteEventCancel = () => setConfirmMessage(null)

    const handleEditEventClick = () => {
        // console.debug('Event -> handleEditEvent')

        setEditEventVisible(true)
    }

    const handleCancelEditEventClick = () => {
        // console.debug('Event -> handleCancelEditEventClick')

        setEditEventVisible(false)
    }

    const handleDeleteEventAccept = () => {
        try {
            logic.deleteEvent(event.id)
                .then(() => onEventDeleted())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditEventSubmit = state => {
        // console.debug('Event -> handleEditEventSubmit')

        state.preventDefault()

        const form = state.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updateEventCaption(event.id, newCaption)
                .then(() => {
                    setEditEventVisible(false)

                    onEventEdited()
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

    const handleGoingEventClick = () => {
        // console.debug('Event -> handleGoingEventClick')

        try {
            logic.toggleGoingEvent(event.id)
                .then(() => onEventGoingToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFavEventClick = () => {
        // console.debug('Event -> handleFavEventClick')
        try {
            logic.toggleFavEvent(event.id)
                .then(() => onEventFavToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleReviewClick = (state) => {
        // console.debug('Event -> handleReviewClick')

        state.preventDefault()

        const { rating, comment } = newReview
        const userId = getUserId()

        if (!rating || !comment) {
            setError('rating and comment cannot be empty')
            return
        }
        if (userId !== event.author.id) {
            try {
                logic.createReview(userId, event.id, rating, comment)
                    .then(() => {
                        setNewReview({ rating: '', comment: '' })
                        setError(null)
                        onEventEdited(event)
                    })
                    .catch(error => {
                        alert(error.message)
                    })
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return <article className="flex flex-col lg:flex-row gap-4 p-4 w-full h-auto bg-white dark:bg-background_grey rounded-xl">

        <Container className="flex flex-row lg:w-1/4 align-middle rounded-lg">
            <Avatar url={'/avatar/avatarIcon.png'} className="w-24 h-24 rounded-full shadow-lg" />
            <Heading level="1" className="ml-2 text-lg text-cities dark:text-white font-bevan">
                {event.author.username}
            </Heading>
        </Container>

        <div className="flex flex-col lg:w-3/4 gap-4">
            <Heading level="2" className="text-xl text-light_grey dark:text-dark_white font-poppins font-bold">
                {event.title}
            </Heading>

            <Image src={event.image} title={event.title} alt={event.caption} className="w-full rounded-lg shadow-lg object-cover" />

            <div className="flex gap-4 mt-4">

                <button
                    onClick={handleGoingEventClick}
                    className={`text-xl py-2 px-4 rounded-md font-bevan text-light_grey dark:text-dark_white
                ${event.going ? 'text-cities' : 'text-light_grey'} 
                border-2 border-transparent transition duration-200 transform scale-100 active:scale-110`}>
                    {event.going ? 'go!' : 'go'}
                </button>

                <Button onClick={handleFavEventClick} className={`py-2 rounded-md flex items-center justify-center text-white'}`}>
                    {event.fav ? (<SolidHeartIcon className="h-8 w-8 text-ore" />) : (<HeartIcon className="h-8 w-8 text-dark_white" />)}
                </Button>

                {event.author.id === logic.getUserId() && (
                    <>
                        <Button onClick={handleDeleteEventClick} className="py-2 px-4 rounded-md bg-transparent text-dark_white hover:bg-opacity-90">Delete</Button>
                        <Button onClick={handleEditEventClick} className="py-2 px-4 rounded-md bg-transparent text-dark_white hover:bg-opacity-90">Edit</Button>
                    </>
                )}
            </div>
            <Paragraph className="text-title dark:text-dark_white font-poppins font-normal text-md mt-2">
                {showFullCaption ? event.caption : truncatedCaption}
                {event.caption.length > captionLimit && (
                    <Button onClick={() => setShowFullCaption(!showFullCaption)} className="text-blue-500 inline ml-1"> {showFullCaption ? 'read Less' : 'read More'}</Button>)}
            </Paragraph>
            <Time className="text-light_grey dark:text-dark_white mt-2">{formatDate(new Date(event.date))}<br />{eventTime(event.time)}</Time>
        </div>

        {event.author.id !== logic.getUserId() && (
            <section className="mt-4">
                <Heading level="3" className="text-title dark:text-dark_white font-montserrat text-xl">
                    Reviews
                </Heading>

                {event.reviews && event.reviews.length ? (event.reviews.map((review, index) => (
                    <Container key={index} className="mt-2 p-4 dark:bg-background_light_grey rounded-lg">
                        <Paragraph className="font-normal text-cities dark:text-cities">
                            {review.author.username} Rating: {review.rating}/5
                            {/* // TODO */}
                        </Paragraph>
                        <Paragraph className="text-title dark:text-dark_white">
                            {review.comment}
                        </Paragraph>
                    </Container>
                ))) : (<Paragraph className="text-light_grey dark:text-dark_white">No reviews yet.</Paragraph>)}

                <Form onSubmit={handleReviewClick} className="flex flex-col mt-4">
                    <Label htmlFor="rating" className="text-title dark:text-dark_white">Rating</Label>
                    <Input id="rating" type="number" value={newReview.rating} onChange={event => setNewReview({ ...newReview, rating: event.target.value })} min="1" max="5" required />

                    <Label htmlFor="comment" className="text-title dark:text-dark_white mt-2">Comment</Label>
                    <Input id="comment" type="text" value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} required />

                    {error && <Paragraph className="text-red-500 mt-2">{error}</Paragraph>}

                    <Button type="submit" className="mt-4 bg-sea text-white py-2 px-4 rounded-md">Submit Review</Button>
                </Form>
            </section>
        )}

        {editEventVisible && (
            <Form onSubmit={handleEditEventSubmit} className="flex-col mt-4 p-4 rounded-lg shadow-lg bg-inherit dark:bg-background_light_grey">
                <Container className="flex-col gap-4">
                    <Label htmlFor="edit-caption-input" className="text-lg font-semibold text-light_grey dark:text-dark_white">
                        Edit Caption
                    </Label>
                    <Input id="edit-caption-input" defaultValue={event.caption} className="w-full h-full p-2 rounded-md border border-light_grey dark:border-dark_white" />
                </Container>

                <Container className="flex justify-end gap-5 mt-4">
                    <Button type="submit" className="font-bevan text-cities py-2 px-4 rounded-md hover:bg-opacity-90">
                        Save
                    </Button>

                    <Button type="button" onClick={handleCancelEditEventClick} className="font-bevan text-md text-light_grey py-2 px-4 rounded-md hover:bg-opacity-90">
                        Cancel
                    </Button>
                </Container>
            </Form>
        )}
        {confirmMessage && (<Confirm
            message={confirmMessage}
            onAccept={handleDeleteEventAccept}
            onCancel={handleDeleteEventCancel} />)}
    </article>
}