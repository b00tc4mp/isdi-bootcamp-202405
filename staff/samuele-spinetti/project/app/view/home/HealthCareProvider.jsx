import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function HealthCareProvider({ healthCareProvider }) {
    const mapRef = useRef()
    const [openingHoursVisible, setOpeningHoursVisible] = useState(false)
    const [mapVisible, setMapVisible] = useState(false)

    const onOpeningHoursClick = () => setOpeningHoursVisible(true)

    const onCancelOpeningHoursClick = () => setOpeningHoursVisible(false)

    const onOpenMapClick = () => setMapVisible(true)

    const onCloseMapClick = () => setMapVisible(false)

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#a3a3a3] bg-white p-[12px] rounded-xl mx-5">
        <Container className="flex flex-col justify-center items-center">
            <Heading className="font-extrabold text-xl text-center">{healthCareProvider.name}</Heading>
            <br />
            <Container className="flex flex-row h-auto w-full">
                <Container className="flex-shrink-0" >
                    <Image className="w-32 rounded-xl" src={healthCareProvider.image} />
                </Container>
                <Container className="flex flex-col flex-grow space-y-2">
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
                    <a className="text-blue-500 underline break-all" href={healthCareProvider.webURL} target="_blank">{healthCareProvider.webURL}</a>
                    <a href={`tel:${healthCareProvider.phoneNumber}`}>{healthCareProvider.phoneNumber}</a>
                </Container>
            </Container>
            <Button onClick={onOpenMapClick}>Map{mapVisible && <>
                <MapContainer className="h-[200px] w-[330px] rounded-2xl"
                    center={healthCareProvider.location.coordinates}
                    zoom={13}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={healthCareProvider.location.coordinates}>
                        <Popup>{healthCareProvider.name}</Popup>
                    </Marker>
                </MapContainer>
                <br />
                <Button onClick={onCloseMapClick}>Close</Button>
            </>}
            </Button>

        </Container>
    </article >
}