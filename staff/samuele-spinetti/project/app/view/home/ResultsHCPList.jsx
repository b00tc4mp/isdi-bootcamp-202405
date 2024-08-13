import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import HealthCareProvider from './HealthCareProvider'

export default function ResultsHCPList() {
    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [healthCareProviders, setHealthCareProviders] = useState()

    useEffect(() => {
        loadHCP()
    }, [q])

    const loadHCP = () => {
        if (q !== null)
            try {
                logic.searchHCP(q)
                    .then(healthCareProviders => setHealthCareProviders(healthCareProviders))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    return <section className="flex flex-col gap-4">
        {
            healthCareProviders.map(healthCareProvider => <HealthCareProvider
                key={healthCareProvider.id}
                healthCareProvider={healthCareProvider}
            />)}
    </section>
}