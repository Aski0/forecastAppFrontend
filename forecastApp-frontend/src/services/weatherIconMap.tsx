import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faSun, faCloudSun, faCloud, faCloudShowersHeavy, faSmog, 
  faCloudRain, faPooStorm, faSnowflake, faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';

// mapa kodów WMO na ikony
// https://open-meteo.com/en/docs (sekcja Weather WMO Codes)
const weatherIconMap: { [key: number]: IconDefinition } = {
  0: faSun,                // Clear sky
  1: faCloudSun,           // Mainly clear
  2: faCloud,              // Partly cloudy
  3: faCloud,              // Overcast
  45: faSmog,              // Fog
  48: faSmog,              // Depositing rime fog
  51: faCloudRain,         // Drizzle: Light
  53: faCloudRain,         // Drizzle: Moderate
  55: faCloudRain,         // Drizzle: Dense intensity
  61: faCloudShowersHeavy, // Rain: Slight
  63: faCloudShowersHeavy, // Rain: Moderate
  65: faCloudShowersHeavy, // Rain: Heavy intensity
  80: faPooStorm,          // Rain showers: Slight
  81: faPooStorm,          // Rain showers: Moderate
  82: faPooStorm,          // Rain showers: Violent
  95: faPooStorm,          // Thunderstorm: Slight or moderate
};

export const getWeatherIcon = (weatherCode: number): IconDefinition => {
  return weatherIconMap[weatherCode] || faQuestionCircle; // Domyślna ikona, jeśli kod nie zostanie znaleziony
};