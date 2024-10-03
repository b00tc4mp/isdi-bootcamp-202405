import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

import geopointerIconSvg from '../../public/icons/geopointer.svg'
import locationIconSvg from '../../public/icons/locationblue.svg'

// Crear el componente separado ProductMap
export default function ProductsMap({ userCoords, groupedProducts, mapCenter, mapZoom }) {
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
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }} whenCreated={map => map.invalidateSize()}>
            <TileLayer
                attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
    )
}
