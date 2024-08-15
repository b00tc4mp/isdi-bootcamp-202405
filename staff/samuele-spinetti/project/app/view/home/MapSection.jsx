import { useEffect, useState } from 'react'

import logic from '../../logic'

import Heading from '../library/Heading'
import Container from '../library/Container'
import SearchHCP from './SearchHCP'
import ResultsHCPList from './ResultsHCPList'

export default function MapSection() {
    const [healthCareProviders, setHealthCareProviders] = useState([])

    useEffect(() => {
        try {
            logic.getAllHCPs()
                .then(healthCareProviders => setHealthCareProviders(healthCareProviders))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <>
        <section className="flex flex-col justify-center items-center gap-6 mb-4 z-40">
            <Container className="flex flex-col items-center">
                <Heading className="text-[#C900CD] text-[20px] font-bold text-center mt-2">LGBTQI+ friendly healthcare providers</Heading>
                <SearchHCP />
            </Container>
        </section >

        <ResultsHCPList />
    </>
}