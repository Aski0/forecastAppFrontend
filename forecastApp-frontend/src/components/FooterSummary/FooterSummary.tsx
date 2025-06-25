// Plik: src/components/FooterSummary/FooterSummary.tsx

import React from 'react';
import type { SummaryData } from '../../types/weather';
import './FooterSummary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

interface FooterSummaryProps {
  //dane mogą być `null`
  summaryData: SummaryData | null;
}

const FooterSummary: React.FC<FooterSummaryProps> = ({ summaryData }) => {
    //placeholder w przypadku braku lokalizacji
  const placeholder = '--';

  return (
    <footer className="footer-summary">
        <h3>Podsumowanie Tygodnia</h3>
      <div className="summary-grid">
        
        <div className="summary-item">
          <h3>Ekstremalne Temperatury</h3>
          <p>
            {/* 
              jeśli `summaryData` istnieje : pokaż dane , w przeciwnym razie, pokaż placeholder.
            */}
            Min: {summaryData ? `${summaryData.minTemperatureWeek.toFixed(1)}°C` : placeholder} / 
            Max: {summaryData ? `${summaryData.maxTemperatureWeek.toFixed(1)}°C` : placeholder}
          </p>
        </div>
        <div className="summary-item">
          <h3>Średnie Ciśnienie</h3>
          <p>
            {summaryData ? `${summaryData.averagePressureHpa.toFixed(0)} hPa` : placeholder}
          </p>
        </div>
        <div className="summary-item">
          <h3>Średnie Nasłonecznienie</h3>
          <p>
            {summaryData ? `${summaryData.averageDaylightDurationHours.toFixed(1)} godz.` : placeholder}
          </p>
        </div>
      </div>
      <div className="summary-comment">
        <p>
          "{summaryData ? summaryData.weatherSummary : 'Brak danych...'}"
        </p>
      </div>
      {/*dodatkowy blok z informacjami o autorze*/}
      <div className="author-info">
        <div className="author-item">
          <FontAwesomeIcon icon={faUser} className="author-icon" />
          <span>Michał Lipiór</span>
        </div>
        <div className="author-item">
          <FontAwesomeIcon icon={faPhone} className="author-icon" />
          <a href="tel:+48123456789">+48 510 612 206</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSummary;