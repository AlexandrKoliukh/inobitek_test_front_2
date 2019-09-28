import React from 'react'
import './loader.css';

const Loader = () => (
  <div className="d-flex justify-content-center spinner-container">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
