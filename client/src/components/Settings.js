import React from 'react';
import './style.css';
import { SetDark, SetLight, SetTheme, GetTheme } from '../utils/ThemeProvider';

const SettingsForm = ({ onClose }) => { 
    
    const toggleTheme = (isDarkModeChecked) => {
        if (isDarkModeChecked) {
            SetDark();
        } else {
            SetLight();
        }
    };

    const defaultDark = GetTheme();
    SetTheme();
    
    return (
        <div className="toggle-theme-wrapper">
        <span>Light</span>
        <label className="toggle-theme" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            defaultChecked={defaultDark}
            onClick={() => toggleTheme(!defaultDark)}
          />
          <div className="slider round"></div>
        </label>
        <span>Dark</span>
        <button onClick={onClose}>Close</button>
      </div>
    );
};

export default SettingsForm;