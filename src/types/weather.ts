//interfejs dla danych na 7 dni
export interface ForecastDay {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  generatedEnergyKwh: number;
}
//interfejs dla podsumowania tygodnia
export interface SummaryData {
  averagePressureHpa: number;
  averageDaylightDurationHours: number;
  minTemperatureWeek: number;
  maxTemperatureWeek: number;
  weatherSummary: string;
}