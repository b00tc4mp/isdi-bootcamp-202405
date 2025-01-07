import React from 'react'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Image from '../library/Image'
import Avatar from './Avatar'

export default function EventCard({ event, onClose }) {
    return (
        <Container className="flex flex-col fixed bottom-0 left-0 right-0 pb-20 bg-white dark:bg-background_grey p-4 shadow-lg rounded-2xl z-10">
            <Container className="flex items-end">
                <Avatar url={'./avatar/avatarIcon.png'} className="w-12 h-12 rounded-full shadow-md" />
                <Paragraph className="ml-4 font-bevan font-bold text-xl text-cities dark:text-dark_white">{event.author.username}</Paragraph>
                <Button onClick={onClose} className="ml-auto text-sm text-grey font-semibold">Close</Button>
            </Container>

            <Heading level={2} className="text-lg font-bold mt-2 text-light_grey dark:text-dark_white">{event.title}</Heading>
            <Paragraph className="mt-2 dark:text-dark_white">{event.caption}</Paragraph>

            <Image src={event.image} className="w-full h-40 mt-4 rounded-lg shadow-md object-cover" />
        </Container>
    )
}