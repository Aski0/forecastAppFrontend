import React from 'react';
import type { ForecastDay } from '../../types/weather';
import { getWeatherIcon } from '../../services/weatherIconMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WeatherTable.scss';

interface WeatherTableProps {
  forecastData: ForecastDay[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ forecastData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="weather-table-container">
      <table className="weather-table">
        <thead>
          <tr>
            {/* 1. Dodajemy pustą komórkę nagłówka dla wyrównania */}
            <th className="corner-header"></th> 
            
            {/* Reszta nagłówków z datami pozostaje bez zmian */}
            {forecastData.map((day) => (
              <th key={day.date}>{formatDate(day.date)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Wiersz z ikoną pogody */}
          <tr>
            {/*etykieta Pogoda*/}
            <th scope="row" className="row-header">Pogoda</th>
            {/*mapowanie ikon w zależności od pogody*/}
            {forecastData.map((day) => (
              <td key={`${day.date}-icon`} className="weather-icon">
                <FontAwesomeIcon icon={getWeatherIcon(day.weatherCode)} size="3x" />
              </td>
            ))}
          </tr>
          
          {/* wiersz z temperaturą */}
          <tr>
            {/* etykieta Temperatura */}
            <th scope="row" className="row-header">Temperatura Max/Min</th>
            
            {forecastData.map((day) => (
              <td key={`${day.date}-temp`}>
                <span className="temp-max">{day.maxTemperature.toFixed(1)}°C</span>
                <span className="temp-min">{day.minTemperature.toFixed(1)}°C</span>
              </td>
            ))}
          </tr>
          
          {/* wiersz z energią */}
          <tr>
            {/* etykieta Energia Słoneczna */}
            <th scope="row" className="row-header">Energia słoneczna</th>
            
            {forecastData.map((day) => (
              <td key={`${day.date}-energy`}>
                <span className="energy-value">{day.generatedEnergyKwh.toFixed(2)} kWh</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;