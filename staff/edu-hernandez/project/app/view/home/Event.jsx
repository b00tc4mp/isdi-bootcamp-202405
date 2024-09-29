import logic from '../../logic'

import formatTime from '../../util/formatTime'

import { useState } from 'react'

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

export default function Event({
    event,
    onEventDeleted,
    onEventEdited,
    onEventFavToggled,
    onEventGoingToggled,
    onUserFollowToggled
}) {
    console.debug('Event -> call')

    const [editEventVisible, setEditEventVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteEventClick = () => setConfirmMessage('Delete Event?')

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

    const handleDeleteEventCancel = () => setConfirmMessage(null)


    const handleEditEventClick = () => {
        console.debug('Event -> handleEditEvent')

        setEditEventVisible(true)
    }

    const handleCancelEditEventClick = () => {
        console.debug('Event -> handleCancelEditEventClick')

        setEditEventVisible(false)
    }

    const handleEditEventSubmit = event => {
        console.debug('Event -> handleEditEventSubmit')

        event.preventDefault()

        const form = event.target

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
        console.debug('Event -> handleGoingEventClick')

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
        console.debug('Event -> handleFavEventClick')

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

    const handleFollowUserClick = () => {
        console.debug('Event -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(event.author.id)
                .then(() => onUserFollowToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="flex flex-col lg:flex-row gap-4 p-4 w-full h-auto bg-white dark:bg-background_grey rounded-lg">

        <Container className="flex flex-col items-center lg:w-1/4 bg-light_grey dark:bg-background_light_grey p-4 rounded-lg">
            <Avatar url={'./avatar/avatarIcon.png'} className="w-24 h-24 rounded-full shadow-lg" />
            <Heading level="1" className="mt-4 text-title dark:text-dark_white font-bevan text-2xl">
                Hola {event.author.username}
            </Heading>
            <Button
                onClick={handleFollowUserClick}
                className={`mt-4 w-full text-white bg-sea py-2 px-4 rounded-md hover:bg-opacity-90 transition-all ${event.author.following ? 'bg-grass' : 'bg-laranja'}`}>
                {event.author.following ? 'Unfollow' : 'Follow'}
            </Button>
        </Container>

        <div className="flex flex-col lg:w-3/4 gap-4">
            <Heading level="2" className="text-title dark:text-dark_white font-montserrat text-3xl">
                {event.title}
            </Heading>

            <Image src={event.image}
                title={event.title}
                alt={event.caption}
                className="w-full rounded-lg shadow-lg object-cover" />

            <Paragraph className="text-title dark:text-dark_white font-poppins text-lg mt-2">
                {event.caption}
            </Paragraph>

            <div className="flex gap-4 mt-4">
                <Button
                    onClick={handleGoingEventClick}
                    className={`py-2 px-4 rounded-md text-black ${event.going ? 'bg-green-100' : 'bg-red-100'}`}>
                    {event.going ? 'Going' : 'Not Going'}
                </Button>

                <Button
                    onClick={handleFavEventClick}
                    className={`py-2 px-4 rounded-md text-white ${event.fav ? 'bg-sea' : 'bg-light_grey'}`}>
                    {event.fav ? 'Fav' : 'Add to Favs'}
                </Button>

                {event.author.id === logic.getUserId() && (
                    <>
                        <Button onClick={handleDeleteEventClick} className="py-2 px-4 rounded-md bg-laranja text-white hover:bg-opacity-90">
                            Delete
                        </Button>
                        <Button onClick={handleEditEventClick} className="py-2 px-4 rounded-md bg-ore text-white hover:bg-opacity-90">
                            Edit
                        </Button>
                    </>
                )}
            </div>

            <Time className="text-light_grey dark:text-dark_white mt-2">
                {formatTime(new Date(event.date))}
            </Time>
        </div>

        {editEventVisible && (
            <Form onSubmit={handleEditEventSubmit} className="flex-col mt-4 p-4 rounded-lg shadow-lg bg-light_grey dark:bg-background_light_grey">
                <Container className="flex-col gap-4">
                    <Label htmlFor="edit-caption-input" className="text-title dark:text-dark_white">
                        Edit Caption
                    </Label>
                    <Input id="edit-caption-input" defaultValue={event.caption} className="w-full p-2 rounded-md border border-light_grey dark:border-dark_white" />
                </Container>

                <Container className="flex justify-between mt-4">
                    <Button type="submit" className="bg-grass text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                        Save
                    </Button>
                    <Button type="button" onClick={handleCancelEditEventClick} className="bg-laranja text-white py-2 px-4 rounded-md hover:bg-opacity-90">
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