import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import HealthCareProvider from './HealthCareProvider'

export default function HealthCareProvidersList() {
    const [healthCareProviders, setHealthCareProviders] = useState()

    useEffect(() => {
        loadHCP()
    }, [refreshStamp])

    const loadHCP = () => {
        try {
            logic.getAllSearchHCPList()
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