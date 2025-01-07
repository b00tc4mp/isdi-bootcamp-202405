import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import getAverageColor from '../../util/getAverageColor.js'

import Heading from '../library/Heading'
import Section from '../library/Section'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Button from '../library/Button'

const RecommendedEventsList = ({ recommendedEvents }) => {
    // console.debug('RecommendedEventsList -> call')
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrowColor, setArrowColor] = useState('text-dark_white')

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? recommendedEvents.length - 1 : prevIndex - 1
        )
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === recommendedEvents.length - 1 ? 0 : prevIndex + 1
        )
    }

    useEffect(() => {
        const updateArrowColor = async () => {
            const image = recommendedEvents[currentIndex]?.image
            if (image) {
                const backgroundColor = await getAverageColor(image)
                if (backgroundColor) {
                    const brightness = (backgroundColor.r * 0.299 + backgroundColor.g * 0.587 + backgroundColor.b * 0.114) / 255
                    const ArrowColor = brightness > 0.5 ? 'text-grey' : 'text-dark_white'
                    setArrowColor(ArrowColor)
                }
            }
        }
        updateArrowColor()

    }, [currentIndex])

    return (
        <Section className="recommended-events px-4 mt-8 w-full relative overflow-hidden">
            <Heading level={2} className="text-xl font-bold mb-4 text-cities">
                Recommended Events
            </Heading>

            <div className="relative w-full">
                {/* Slides Container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out space-x-4"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {recommendedEvents.map((event) => (
                        <Container key={event.id} className="flex-shrink-0 w-60 shadow-lg rounded">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-bold dark:text-dark_white">{event.title}</h3>
                                </div>
                            </div>
                        </Container>
                    ))}
                </div>

                {/* Carousel Buttons */}
                <Button
                    className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${arrowColor} p-2 rounded shadow-md bg-white opacity-70`}
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    title="Previous Slide"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>

                <Button
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${arrowColor} p-2 rounded shadow-md bg-white opacity-70`}
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    title="Next Slide"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </Button>

            </div>
        </Section>
    )
}

export default RecommendedEventsList