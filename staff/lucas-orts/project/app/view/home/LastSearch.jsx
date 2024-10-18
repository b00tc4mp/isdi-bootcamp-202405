import useContext from '../context'

import Accept from '../common/Accept'

import ResultsProduct from './ResultsProduct'
import ProductsMap from './ProductsMap'

import { useState, useEffect } from 'react'



export default function LastSearch({ setRefreshCart }) {
    const [acceptMessage, setAcceptMessage] = useState(null)
    const { lastSearch } = useContext()  // Obtener la lista de productos
    const [userCoords, setUserCoords] = useState(null)  // Guardar las coordenadas del usuario
    const [mapCenter, setMapCenter] = useState([51.505, -0.09])  // Coordenadas por defecto (Londres)
    const [mapZoom] = useState(13)  // Nivel de zoom inicial
    const [groupedProducts, setGroupedProducts] = useState({})  // Productos agrupados por ubicación

    useEffect(() => {
        if (lastSearch && lastSearch.length > 0) {
            // Intentar obtener las coordenadas del usuario
            navigator.geolocation.getCurrentPosition(position => {
                const coords = [position.coords.latitude, position.coords.longitude]
                setUserCoords(coords)  // Guardar la posición del usuario
                setMapCenter(coords)   // Centramos el mapa en la posición del usuario
            })

            groupProductsByLocation(lastSearch)  // Agrupar productos por ubicación
        }
    }, [lastSearch])

    const handleProductAdded = () => {
        setRefreshCart(Date.now())
        setAcceptMessage('Product added to cart successfully!')
    }

    const handleAddedCartProductAccept = () => {
        setAcceptMessage(null)
    }


    // Agrupar productos por su ubicación
    const groupProductsByLocation = (products) => {
        const grouped = products.reduce((acc, product) => {
            const { coordinates } = product.location || {}
            if (coordinates) {
                const key = `${coordinates[0]},${coordinates[1]}`  // lat-long como clave
                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(product)  // Añadir el producto al grupo
            }
            return acc
        }, {})

        setGroupedProducts(grouped)  // Guardar productos agrupados
    }

    return (
        <section className='w-full flex flex-col gap-4'>
            <ProductsMap
                userCoords={userCoords}
                groupedProducts={groupedProducts}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
            />

            {/* Renderizar los resultados de la búsqueda */}
            {Array.isArray(lastSearch) && lastSearch.length > 0 ? (
                <section className='w-full flex flex-col gap-4'>
                    {lastSearch.map(product => (
                        <ResultsProduct
                            key={product.id}
                            product={product}
                            onProductAdded={handleProductAdded}
                        />
                    ))}
                </section>
            ) : (
                <p>No hay búsquedas recientes.</p>
            )}
            {acceptMessage && <Accept message={acceptMessage} onAccept={handleAddedCartProductAccept} />}
        </section>
    )
}