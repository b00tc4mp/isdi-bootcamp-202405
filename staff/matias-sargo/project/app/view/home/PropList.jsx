import { useState, useEffect } from 'react'
import logic from '../../logic'
import Property from './Property' 
import Button from '../library/Button'

export default function PropertyList({ properties, onBack }) {
    const [propertyList, setPropertyList] = useState([])

    useEffect(() => {
        setPropertyList(properties)
    }, [properties])

    const handlePropertyDeleted = () => loadProperties()

    const handlePropertyEdited = () => loadProperties()

    const loadProperties = () => {
        try {
            logic.getAllProperties() 
                .then(properties => setPropertyList(properties))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return (
        <section className='mt-[10px] mb-[-20px] flex flex-col gap-4'>
            <Button onClick={onBack}>back</Button>

            {propertyList.map(property => (
                <Property
                    key={property.id}
                    property={property}
                    onPropertyDeleted={handlePropertyDeleted}
                    onPropertyEdited={handlePropertyEdited} 
                />
            ))}
        </section>
    )
}