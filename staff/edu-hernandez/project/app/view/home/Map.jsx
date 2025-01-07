import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useContext from '../context.js'
import logic from '../../logic'
import 'leaflet/dist/leaflet.css'
import EventCard from './EventCard'
import MarkerIcon from '../library/MarkerIcon'

export default function Map() {
  // console.debug('Map -> call')

  const { theme, alert } = useContext()
  const [events, setEvents] = useState([])
  const [selectEvent, setSelectEvent] = useState(null)

  useEffect(() => {
    // console.debug('MapEvents -> useEffect')

    loadEvents()
  }, [])

  const handleMarkerClick = (event) => {
    setSelectEvent(event)
  }

  const loadEvents = () => {
    try {
      logic.getAllMapEvents()
        .then(events => setEvents(events))
        .catch(error => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const TileLayerUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

  return (
    <div className="">
      <MapContainer className="overflow-hidden" center={[41.3874, 2.1686]} zoom={13} style={{ height: 'calc(100vh - 128px)', zIndex: 1 }}>
        <TileLayer url={TileLayerUrl} />

        {events.map(event => (
          <Marker key={event.id} position={event.location.coordinates} icon={MarkerIcon} eventHandlers={{ click: () => handleMarkerClick(event) }} />
        ))}
      </MapContainer>
      {selectEvent && (
        <EventCard className="" event={selectEvent} onClose={() => setSelectEvent(null)} />)}
    </div>
  )
}