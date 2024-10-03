import React from 'react'

import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

const BannerEvent = ({ event }) => {
    return (
        <section className="w-full banner-event mt-8 p-4 bg-cities-gradient text-white relative overflow-hidden">
            <div className="flex flex-col items-start z-10">
                <Heading className="text-3xl font-bold">{event.title}</Heading>
                <Paragraph className="mt-2">{event.description}</Paragraph>
            </div>

            <div className="w-full mt-4 h-64 sm:h-72 lg:h-96 overflow-hidden">
                <Image 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    )
}

export default BannerEvent