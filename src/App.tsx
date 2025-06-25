import { useState, useEffect } from 'react';
import { getForecast, getSummary } from './services/weatherApi';
import type { ForecastDay, SummaryData } from './types/weather';
import WeatherTable from './components/WeatherTable/WeatherTable';
import FooterSummary from './components/FooterSummary/FooterSummary';
import LocationMap from './components/LocationMap/LocationMap';
import { LatLng } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import CloudSunIcon from './components/CloudSunIcon/CloudSunIcon';

function App() {
  //stany aplikacji
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  //próba pobrania lokalizacji użytkownika
  const fetchUserLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    } catch (err) {
      //obsługa braku zgody na lokalizację
      setError('Odmówiono dostępu do lokalizacji. Wybierz punkt na mapie.');
      setLoading(false);
    }
  };
  // wywołanie po załadowaniu komponentu – próba uzyskania lokalizacji
  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // pobieranie prognozy i podsumowania
        const [forecastData, summaryData] = await Promise.all([
          getForecast(location.lat, location.lon),
          getSummary(location.lat, location.lon),
        ]);
        setForecast(forecastData);
        setSummary(summaryData);
      } catch (err) {
        setError('Nie udało się pobrać danych pogodowych.');
        setForecast(null);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);
  // obsługa kliknięcia na mapie –> ustawienie nowej lokalizacji
  const handleLocationSelect = (selectedLatLng: LatLng) => {
    setLocation({
      lat: selectedLatLng.lat,
      lon: selectedLatLng.lng,
    });
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="layout-grid">
          {/* lewa kolumna: tytuł, opis, przycisk lokalizacji */}
          <div className="left-column">
            <div className="title-container">
              <CloudSunIcon></CloudSunIcon>
              <h2>Prognoza Pogody</h2>
            </div>
            <p className="description">
              Użyj swojej aktualnej lokalizacji lub kliknij na mapie, aby sprawdzić prognozę.
            </p>
            <button className="location-button" onClick={fetchUserLocation}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Użyj mojej lokalizacji</span>
            </button>
          </div>

          {/* prawa kolumna z mapą */}
          <div className="right-column">
            <LocationMap selectedPosition={location} onLocationSelect={handleLocationSelect} />
          </div>

        </div> 
        {/* informacje w przypadku pobierania/niepowodzenia pobierania danych*/}
        {loading && <div className="loading">Ładowanie...</div>}
        {error && <div className="error">{error}</div>}

         {/* wyświetlanie tabeli w przypadku pobrania danych*/}
        {!loading && !error && forecast && (
          <WeatherTable forecastData={forecast} />
        )}

      </main>
      
      {/* stopka z podsumowaniem – zawsze widoczna */}
        <FooterSummary summaryData={summary} />
    </div>
  );
}

export default App;