import logic from '../../logic'
import { useState, useEffect } from 'react'
import getAverageColor from '../../util/getAverageColor'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import getUserId from '../../logic/getUserId'

const PopularEventsList = ({ userId }) => {
    // console.debug('PopularEventsList -> call')

    userId = getUserId()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrowColor, setArrowColor] = useState('text-dark_white')

    useEffect(() => {
        const updateArrowColor = async () => {
            const image = items[currentIndex]?.image
            if (image) {
                const averageColor = await getAverageColor(image)
                if (averageColor) {
                    const brightness = (averageColor.r * 0.299 + averageColor.g * 0.587 + averageColor.b * 0.114) / 255
                    const newArrowColor = brightness > 0.5 ? 'text-grey' : 'text-dark_white'
                    setArrowColor(newArrowColor)
                }
            }
        }

        updateArrowColor()
    }, [currentIndex])

    useEffect(() => {
        logic.getAllPopularEvents(userId)
            .then(items => {
                setItems(items)
                setLoading(false)
            })
            .catch(error => {
                console.error('error fetching popular events:', error)

                setLoading(false)
            })
    }, [userId])

    if (loading) return <Paragraph>Loading..</Paragraph>

    if (items.length === 0) return
    <Container className="bg-grey p-10">
        <Paragraph className="font-bevan text-lg text-cities">
            Slide here<br /><span className="font-poppins font-normal text-lg">Wait for other users mark events to go...</span>
        </Paragraph>
    </Container>

    return (
        <section className="popular-events px-4 mt-8 w-full relative overflow-scroll">
            <Heading level={2} className="text-2xl font-bevan ont-bold mb-4 text-cities">
                Popular Events
            </Heading>

            <Container className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div
                    className="flex space-x-4"
                    style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
                    {items.map((item) => (
                        <Container key={item.id} className="flex-shrink-0 w-60 p-2 shadow-lg rounded">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <Heading level={3} className="text-lg font-bold dark:text-dark_white">{item.title}</Heading>
                                </div>
                            </div>
                        </Container>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default PopularEventsList
