import { useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import Heading from '../library/Heading'
import SearchHCP from './SearchHCP'
import HealthCareProvidersList from './HealthCareProvidersList'
import ResultsHCPList from './ResultsHCPList'

import Context from '../../Context'

import logic from '../../logic'
import Container from '../library/Container';

export default function MapSection() {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const mapRef = useRef()
    const [healthCareProviders, setHealthCareProviders] = useState()

    const handleSearchHealthCareProviderClick = () => {

    }

    return <>
        <section className="flex flex-col justify-self-center items-center gap-2 fixed bg-white border-none">
            <Container>
                <Heading className="text-[#C900CD] text-[20px] font-bold">LGBTQI+ friendly healthcare providers</Heading>
                <SearchHCP onHealthCareProviderSearched={handleSearchHealthCareProviderClick}></SearchHCP>

                <MapContainer className="h-[350px] w-[90%] rounded-2xl"
                    center={[41.3851, 2.1734]} // Barcelona
                    zoom={13}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </Container>
        </section >

        <HealthCareProvidersList className="" />
        {/* <Routes>
            <Route path="/map" element={<HealthCareProvidersList />} />
            <Route path="/hcpsearchlist" element={<ResultsHCPList />} />
        </Routes> */}
    </>
}