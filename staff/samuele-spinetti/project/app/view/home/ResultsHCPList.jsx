import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContext from '../context.js'

import logic from '../../logic'

import HealthCareProvider from './HealthCareProvider'

export default function ResultsHCPList() {
    const [searchParams] = useSearchParams()
    const [healthCareProviders, setHealthCareProviders] = useState([])
    const { alert } = useContext()

    const q = searchParams.get('q')
    const distance = Number(searchParams.get('distance'))

    useEffect(() => {
        loadHCP()
    }, [q, distance])

    const loadHCP = () => {
        if (q !== null) {
            navigator.geolocation.getCurrentPosition((position => {
                const coords = [position.coords.latitude, position.coords.longitude]
                try {
                    logic.searchHCP(q, distance, coords)
                        .then(healthCareProviders => setHealthCareProviders(healthCareProviders))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            }), error => {
                console.error(error)

                alert(error.message)
            })
        }
    }

    return <section className="flex flex-col gap-6 mb-24">
        {healthCareProviders.map(healthCareProvider => <HealthCareProvider
            key={healthCareProvider.id}
            healthCareProvider={healthCareProvider}
        />)}
    </section>
}