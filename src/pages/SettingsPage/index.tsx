import React from 'react';
import './styles.css';

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page-container">
      <h1 className="settings-page-title">
        Configuración
      </h1>
      <p className="settings-page-subtitle">
        Contenido de configuración en desarrollo
      </p>
      
      <div className="settings-page-placeholder">
        <div>
          <div className="settings-page-icon">⚙️</div>
          <p className="settings-page-placeholder-text">
            Panel de configuración próximamente...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
