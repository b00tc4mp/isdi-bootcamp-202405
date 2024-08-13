import { useState } from 'react'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function HealthCareProvider({ healthCareProvider }) {
    const [openingHoursVisible, setOpeningHoursVisible] = useState(false)

    const onOpeningHoursClick = () => setOpeningHoursVisible(true)

    const onCancelOpeningHoursClick = () => setOpeningHoursVisible(false)

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#41ff7a] bg-white p-0">
        <Container className="flex flex-col justify-center items-center">
            <Heading>{healthCareProvider.name}</Heading>
            <Image className="w-[300px] " src={healthCareProvider.image} />
            <Paragraph>{healthCareProvider.street}</Paragraph>
            {healthCareProvider.openingHours[0] === 'Open 24h'
                ? <Paragraph>Open 24H</Paragraph>
                : <Button onClick={onOpeningHoursClick}>Opening Hours</Button>}
            {openingHoursVisible && <><ul>
                <li>{healthCareProvider.openingHours[0]}</li>
                <li>{healthCareProvider.openingHours[1]}</li>
                <li>{healthCareProvider.openingHours[2]}</li>
                <li>{healthCareProvider.openingHours[3]}</li>
                <li>{healthCareProvider.openingHours[4]}</li>
                <li>{healthCareProvider.openingHours[5]}</li>
                <li>{healthCareProvider.openingHours[6]}</li>
            </ul>
                <Button onClick={onCancelOpeningHoursClick}>Cancel</Button>
            </>}
            <a href={healthCareProvider.webURL} target="_blank">{healthCareProvider.webURL}</a>
            <a href={`tel:${healthCareProvider.phoneNumber}`}>{healthCareProvider.phoneNumber}</a>
        </Container>
    </article>
}