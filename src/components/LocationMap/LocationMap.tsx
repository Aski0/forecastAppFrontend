import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { LatLng, type LatLngTuple, type LatLngExpression } from 'leaflet';
import './LocationMap.scss';

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
}

const LocationMap: React.FC<LocationMapProps> = ({ selectedPosition, onLocationSelect }) => {
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
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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