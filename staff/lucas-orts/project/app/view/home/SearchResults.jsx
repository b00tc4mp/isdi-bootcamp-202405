import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Accept from '../common/Accept'
import logic from '../../logic'

import useContext from '../context'

import ResultsProduct from './ResultsProduct'
import ProductsMap from './ProductsMap'

export default function SearchResults({ setRefreshCart }) {
    const [acceptMessage, setAcceptMessage] = useState(null)
    const { setLastSearch } = useContext()
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [mapCenter, setMapCenter] = useState([51.505, -0.09])  // Coordenadas por defecto
    const [mapZoom] = useState(13)  // Nivel de zoom inicial
    const [userCoords, setUserCoords] = useState(null)  // Coordenadas del usuario
    const [groupedProducts, setGroupedProducts] = useState({})  // Productos agrupados por ubicación

    const name = searchParams.get('name') || ''
    const type = searchParams.get('type') || ''
    const distance = Number(searchParams.get('distance'))

    useEffect(() => {
        loadProducts()
    }, [name, type, distance])

    const loadProducts = () => {
        navigator.geolocation.getCurrentPosition((position => {
            const coords = [position.coords.latitude, position.coords.longitude]
            setUserCoords(coords)
            setMapCenter(coords)

            try {
                logic.searchProducts({ name, type, distance, coords })
                    .then(products => {
                        setProducts(products)
                        setLastSearch(products)
                        groupProductsByLocation(products)
                    })
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

    const groupProductsByLocation = (products) => {
        const grouped = products.reduce((acc, product) => {
            const { coordinates } = product.location || {}
            if (coordinates) {
                const key = `${coordinates[0]},${coordinates[1]}`
                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(product)
            }
            return acc
        }, {})

        setGroupedProducts(grouped)
    }

    const handleProductAdded = () => {
        setRefreshCart(Date.now())
        setAcceptMessage('Product added to cart successfully!')
    }

    const handleAddedCartProductAccept = () => {
        setAcceptMessage(null)
    }

    return <section className='w-full flex flex-col gap-4'>
        {/* Renderizar el nuevo componente ProductMap */}
        <ProductsMap
            userCoords={userCoords}
            groupedProducts={groupedProducts}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
        />

        {/* Lista de productos */}
        <section className='w-full flex flex-col gap-4'>
            {products.map(product => (
                <ResultsProduct
                    key={product.id}
                    product={product}
                    onProductAdded={handleProductAdded}
                />
            ))}
        </section>

        {acceptMessage && <Accept message={acceptMessage} onAccept={handleAddedCartProductAccept} />}
    </section>
}