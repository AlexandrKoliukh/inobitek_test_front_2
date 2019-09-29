import React from 'react';
import './error-indicator.css';
import icon from './error.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error-icon" className="error-icon"/>
      <span className="boom">BOOM!</span>
      <span>
				Network problems...
			</span>
    </div>
  );
};

export default ErrorIndicator;
