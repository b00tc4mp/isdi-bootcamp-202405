import logic from '../../logic/index.js'
import formatTime from '../../utils/formatTime.js'

import { useState } from 'react'
import { BiLike } from "react-icons/bi"
import { BiSolidLike } from "react-icons/bi"
import { BsTrash3 } from "react-icons/bs"
import { GoStarFill } from "react-icons/go"
import { FiStar } from "react-icons/fi"
import { FaCalendarAlt } from "react-icons/fa"
import { CiEdit } from "react-icons/ci"

import Container from '../library/Container.jsx'
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Link from '../library/Link.jsx'
import Button from '../library/Button.jsx'
import Heading from '../library/Heading.jsx'
import Form from '../library/Form.jsx'
import Input from '../library/Input.jsx'
import Label from '../library/Label.jsx'

import Confirm from '../common/Confirm.jsx'

export default function Event({ event, onEventDeleted, onEventEdited, onEventLikeToggled, onEventAttendanceToggled }) {

    const [editEventVisible, setEditEventVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteEventClick = () => setConfirmMessage('Delete event?')

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
        setEditEventVisible(true)
    }

    const handleCancelEditEventClick = () => {
        setEditEventVisible(false)
    }

    const handleEditEventSubmit = e => {
        e.preventDefault()

        const form = e.target

        const editTitleInput = form['edit-title-input']
        const editDateInput = form['edit-date-input']
        const editOrganizerInput = form['edit-organizer-input']
        const editDurationInput = form['edit-duration-input']
        const editDescriptionInput = form['edit-description-input']
        const editImageInput = form['edit-image-input']
        const editLatitudeInput = form['edit-latitude-input']
        const editLongitudeInput = form['edit-longitude-input']
        const editAddressInput = form['edit-address-input']
        const editCityInput = form['edit-city-input']

        const editTitle = editTitleInput.value.trim()
        const editDate = editDateInput.value
        const editOrganizer = editOrganizerInput.value.trim()
        const editDuration = editDurationInput.value.trim()
        const editDescription = editDescriptionInput.value.trim()
        const editImage = editImageInput.value.trim()
        const editLatitude = parseFloat(editLatitudeInput.value.trim())
        const editLongitude = parseFloat(editLongitudeInput.value.trim())
        const editAddress = editAddressInput.value.trim()
        const editCity = editCityInput.value.trim()

        try {
            logic.updateEvent(event.id, editTitle, editOrganizer, editDate, editDuration, editDescription, editImage, editLongitude, editLatitude, editAddress, editCity)
                .then(() => {
                    setEditEventVisible(false)
                    onEventEdited({
                        ...event,
                        title: editTitle,
                        date: editDate,
                        organizer: editOrganizer,
                        duration: editDuration,
                        description: editDescription,
                        image: editImage,
                        location: {
                            coordinates: [editLatitude, editLongitude]
                        },
                        address: editAddress,
                        city: editCity
                    })
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


    const handleLikeEventClick = () => {
        try {
            logic.toggleLikeEvents(event.id)
                .then(() => onEventLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAttendanceEventClick = () => {
        try {
            logic.toggleAttendanceEvent(event.id)
                .then(() => onEventAttendanceToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#050968] rounded-[5px] bg-[#FFEBF4] p-2 m-2 font-bold relative">

        {editEventVisible && < Form className="flex-col min-w-[80%] items-center" onSubmit={handleEditEventSubmit} >
            <Heading className="text-[#050968] font-bold">Edit Event</Heading>

            <Container className="flex-col items-center gap-2.5 mt-0">
                <Input className="w-11/12 p-0.5 font-normal" id="edit-title-input" placeholder='Event Title' defaultValue={event.title}></Input>
                <Input className="w-11/12 p-0.5 font-normal" id="edit-organizer-input" placeholder='Organizer Name' defaultValue={event.organizer}></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968] p-0.5 text-sm" htmlFor="date-select" >Date of the event</Label>
                    <Input className="p-0.5 text-[#050968] text-sm font-normal" id="edit-date-input" type="date"></Input>
                </ Container>

                <Input className="w-11/12 p-0.5 font-normal" id="edit-duration-input" placeholder='Duration of the event' defaultValue={event.duration}></Input>
                <Input className="w-11/12 p-0.5 font-normal" id="edit-description-input" placeholder='Description of the event' defaultValue={event.description}></Input>
                <Input className="w-11/12 p-0.5 font-normal" id="edit-image-input" placeholder='Image of the event' defaultValue={event.image}></Input>
                <Input className="w-11/12 p-0.5 font-normal" id="edit-address-input" placeholder='Address of the event' defaultValue={event.address}></Input>
                <Input className="w-11/12 p-0.5 font-normal" id="edit-city-input" placeholder='City of the event' defaultValue={event.city}></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968] p-1" htmlFor="Location">Location</Label>
                    <Input className="w-11/12 p-0.5 font-normal" id="edit-latitude-input" placeholder='Latitude' defaultValue={event.location.coordinates[0]}></Input>
                    <Input className="w-11/12 p-0.5 font-normal" id="edit-longitude-input" placeholder='Longitude' defaultValue={event.location.coordinates[1]}></Input>
                </Container>

                <Container className="flex justify-between gap-2 mb-5 mt-3">
                    <Button type="submit" className="h-6.5 bg-[#050968] w-32">Save</Button>
                    <Button className="h-6.5 bg-[#050968] w-32" onClick={handleCancelEditEventClick}>Cancel</Button>
                </Container>

            </Container>

        </Form>
        }

        <Container className="items-start relative h-28">

            <Button className="absolute right-0 flex items-center mr-1 mt-1.5" onClick={handleLikeEventClick}>{event.like ? <BiSolidLike color="050968" size={17} /> : <BiLike color="050968" size={17} />}</Button>

            <Container className="flex-shrink-0">
                <Image src={event.image} alt={event.title} title={event.title} className="h-24 w-24 rounded-xl mr-2 mt-2 border-2 shadow-[1px_1px_10px_1px] shadow-[#050968]" />
            </Container>

            <Container className="flex flex-col justify-start items-start w-full ml-2 mt-4">
                <Heading level="5" className="text-[#050968] text-sm font-bold mb-2 -mt-1 mr-6" >{event.title}</Heading>
                <Paragraph className="text-[#050968] text-[10px] font-bold flex items-center ml-6"><FaCalendarAlt className="mr-1" />{formatTime(new Date(event.date))}</Paragraph>
            </Container>

            <Button className="mt-11 mr-1 text-sm" onClick={handleAttendanceEventClick}>{event.attendance ? <GoStarFill color="050968" size={16} /> : <FiStar color="080968" size={16} />}<span style={{ color: '#050968' }}>{' '}{event.attendees.length}</span></Button>

            <Container className="absolute bottom-0 right-3 flex items-end space-x-8">
                <Link className="mb-0 text-[#9747FF] text-xs" href={`/info/${event.id}`}><u>+Info</u></Link>
            </Container>

            <Container className="absolute bottom-0 right-24 space-x-3">
                {event.author.id === logic.getUserId() && <>
                    <Button className="-mb-2" onClick={handleEditEventClick}><CiEdit color="050968" size={18} />
                    </Button>
                    <Button className="-mb-2" onClick={handleDeleteEventClick}><BsTrash3 color="050968" size={13} />
                    </Button>
                </>}
            </Container>

        </Container>

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel} />}

    </article >
}

