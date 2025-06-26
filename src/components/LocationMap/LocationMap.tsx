import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L, { LatLng, type LatLngTuple, type LatLngExpression } from 'leaflet';
import './LocationMap.scss';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';


//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});
// komponent pomocniczy do obsługi kliknięć na mapie
const MapClickHandler = ({ onLocationSelect }: { onLocationSelect: (latlng: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      // przekazujemy obiekt latlng, a komponent nadrzędny zajmie się resztą
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

// komponent pomocniczy do centrowania mapy na wybranej lokalizacji
const ChangeView = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

interface LocationMapProps {
  selectedPosition: { lat: number, lon: number } | null;
  onLocationSelect: (location: LatLng) => void; 
  theme: 'light' | 'dark'; 
}

const LocationMap: React.FC<LocationMapProps> = ({ selectedPosition, onLocationSelect,theme }) => {
  // Ddmyślna pozycja jako LatLngTuple
  const defaultPosition: LatLngTuple = [52.2297, 21.0122]; 

  const currentPosition: LatLngTuple = selectedPosition 
    ? [selectedPosition.lat, selectedPosition.lon] 
    : defaultPosition;

  return (
    <div className="map-wrapper">
      <MapContainer center={currentPosition} zoom={10} className="leaflet-container">
        <ChangeView center={currentPosition} />
        <TileLayer
          attribution={
            theme === 'dark'
              ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>'
              : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          }
          url={
            theme === 'dark'
              ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />
        {/* <TileLayer
  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>'
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
/> */}
        {selectedPosition && (
          <Marker position={[selectedPosition.lat, selectedPosition.lon]}>
            <Popup>
              Wybrana lokalizacja <br />
              Szer: {selectedPosition.lat.toFixed(4)}, Dł: {selectedPosition.lon.toFixed(4)}
            </Popup>
          </Marker>
        )}
        <MapClickHandler onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;