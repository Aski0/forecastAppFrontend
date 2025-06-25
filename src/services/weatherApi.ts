import axios from 'axios';
import type { ForecastDay, SummaryData } from '../types/weather';

//adres backendu
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// dane mockowane do sprawdzenia bez połączenia z backendem
const MOCKED_FORECAST_DATA: ForecastDay[] = [{"date":"2025-06-24","weatherCode":3,"minTemperature":14.6,"maxTemperature":21.8,"generatedEnergyKwh":8.38},{"date":"2025-06-25","weatherCode":53,"minTemperature":15.3,"maxTemperature":24.5,"generatedEnergyKwh":8.38},{"date":"2025-06-26","weatherCode":3,"minTemperature":13.8,"maxTemperature":25.4,"generatedEnergyKwh":8.37},{"date":"2025-06-27","weatherCode":55,"minTemperature":14.8,"maxTemperature":22.1,"generatedEnergyKwh":8.37},{"date":"2025-06-28","weatherCode":2,"minTemperature":13.5,"maxTemperature":23.0,"generatedEnergyKwh":8.36},{"date":"2025-06-29","weatherCode":2,"minTemperature":17.0,"maxTemperature":23.9,"generatedEnergyKwh":8.36},{"date":"2025-06-30","weatherCode":1,"minTemperature":14.4,"maxTemperature":23.2,"generatedEnergyKwh":8.35}];
const MOCKED_SUMMARY_DATA: SummaryData = {"averagePressureHpa":1014.2,"averageDaylightDurationHours":16.7,"minTemperatureWeek":13.5,"maxTemperatureWeek":25.4,"weatherSummary":"Tydzień w większości bez opadów"};

const USE_MOCKS = false;

// Symulacja opóźnienia sieciowego
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Funkcja pobierająca prognozę na 7 dni
export const getForecast = async (lat: number, lon: number): Promise<ForecastDay[]> => {
  if (USE_MOCKS) {
    console.log(`Pobieranie MOCKOWANEJ prognozy dla: ${lat}, ${lon}`);
    await sleep(500);
    return MOCKED_FORECAST_DATA;
  }
  const response = await axios.get(`${API_BASE_URL}/forecast`, { params: { lat, lon } });
  return response.data;
};

// Funkcja pobierająca podsumowanie tygodnia
export const getSummary = async (lat: number, lon: number): Promise<SummaryData> => {
  if (USE_MOCKS) {
    console.log(`Pobieranie MOCKOWANEGO podsumowania dla: ${lat}, ${lon}`);
    await sleep(500);
    return MOCKED_SUMMARY_DATA;
  }
  const response = await axios.get(`${API_BASE_URL}/summary`, { params: { lat, lon } });
  return response.data;
};