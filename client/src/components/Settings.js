import React, { useState } from 'react';
import './style.css';

const SettingsForm = ({onSettingsChange: onSettingsChanged, user}) => { 
    const toggleButton = () => 
    {
        const button = document.getElementById('toggleButton');
        button.classList.toggle('active');
        button.textContent = button.classList.contains('active') ? 'Dark' : 'Light';
        user.settings.Theme = button.textContent;
        onSettingsChanged(user.settings);
    };

    return (
        <button id="toggleButton" className="toggle-btn" onClick={toggleButton}>Dark Mode</button>
    );
};

export default SettingsForm;