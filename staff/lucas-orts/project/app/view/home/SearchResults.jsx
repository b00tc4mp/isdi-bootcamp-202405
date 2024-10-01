import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'  // Importar Leaflet para crear el icono

import geopointerIconSvg from '../../public/icons/geopointer.svg'
import locationIconSvg from '../../public/icons/location.svg'


import logic from '../../logic'
import ResultsProduct from './ResultsProduct'
import useContext from '../context'

export default function SearchResults() {
    const { setLastSearch } = useContext()
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]) // Coordenadas por defecto (Londres)
    const [mapZoom] = useState(13)  // Nivel de zoom inicial
    const [userCoords, setUserCoords] = useState(null)  // Guardar las coordenadas del usuario
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
            setUserCoords(coords)  // Guardar la posición del usuario
            setMapCenter(coords)   // Centramos el mapa en la posición del usuario
            try {
                logic.searchProducts({ name, type, distance, coords })
                    .then(products => {
                        setProducts(products)
                        setLastSearch(products)
                        groupProductsByLocation(products)  // Agrupar productos por ubicación
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

    const handleProductAdded = () => {
        alert('Product added to cart successfully!')
    }

    // Crear un ícono personalizado usando el SVG
    const geopointerIcon = new L.Icon({
        iconUrl: geopointerIconSvg,
        iconSize: [32, 32],  // Ajustar el tamaño del icono
        iconAnchor: [16, 32],  // El punto donde el icono se ancla en el mapa (mitad abajo)
        popupAnchor: [0, -32],  // Donde se ancla el popup (justo arriba del icono)
    })


    const locationIcon = new L.Icon({
        iconUrl: locationIconSvg,
        iconSize: [32, 32],  // Ajustar el tamaño del icono
        iconAnchor: [16, 32],  // El punto donde el icono se ancla en el mapa (mitad abajo)
        popupAnchor: [0, -32],  // Donde se ancla el popup (justo arriba del icono)
    })

    // Hook para centrar el mapa y recalcular su tamaño al cargar
    const MapCenterUpdater = () => {
        const map = useMap()

        useEffect(() => {
            if (userCoords) {
                map.flyTo(userCoords, mapZoom)
                map.invalidateSize()
            }
        }, [userCoords, map, mapZoom])

        return null
    }

    return (
        <section className='flex flex-col gap-4'>
            {/* Mapa con Leaflet */}
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }} whenCreated={map => map.invalidateSize()}>
                <TileLayer
                    attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Componente para centrar el mapa */}
                <MapCenterUpdater />

                {/* Mostrar ubicación del usuario como un marcador */}
                {userCoords && (
                    <Marker position={userCoords} icon={geopointerIcon}>
                        <Popup>
                            Tu ubicación
                        </Popup>
                    </Marker>
                )}

                {/* Mostrar productos agrupados como marcadores */}
                {Object.keys(groupedProducts).map((key) => {
                    const [lat, lng] = key.split(',').map(Number)  // Extraer latitud y longitud del key
                    const productsInLocation = groupedProducts[key]

                    return (
                        <Marker key={key} position={[lat, lng]} icon={locationIcon}>
                            <Popup>
                                <strong>Product IDs:</strong><br />
                                {productsInLocation.map(product => product.id).join(', ')}
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>

            {/* Lista de productos */}
            <section className='flex flex-col gap-4'>
                {products.map(product => (
                    <ResultsProduct
                        key={product.id}
                        product={product}
                        onProductAdded={handleProductAdded}
                    />
                ))}
            </section>
        </section>
    )
}