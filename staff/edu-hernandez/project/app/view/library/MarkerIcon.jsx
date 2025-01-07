import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const MarkerIcon = new L.Icon({
  iconUrl: './iconSet/cities-marker-icon.svg',
  iconRetinaUrl: './iconSet/cities-marker-icon.svg',
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41] // Size of the shadow
});

export default MarkerIcon