import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Paragraph from '../library/Paragraph'
import logic from '../../logic'

import ResultsProduct from './ResultsProduct'

export default function SearchResults() {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])

    // const q = searchParams.get('q') || ''
    const name = searchParams.get('name') || ''
    const type = searchParams.get('type') || ''
    const distance = Number(searchParams.get('distance'))

    useEffect(() => {
        loadProducts()
    }, [name, type, distance])  // Ahora `useEffect` depende de todas las variables

    const loadProducts = () => {
        navigator.geolocation.getCurrentPosition((position => {
            const coords = [position.coords.latitude, position.coords.longitude]
            try {
                logic.searchProducts({ name, type, distance, coords })
                    .then(products => setProducts(products))
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

    return <section className='flex flex-col gap-4'>
        {products.map(product => <ResultsProduct
            key={product.id}
            product={product}
        />)}
    </section>
}