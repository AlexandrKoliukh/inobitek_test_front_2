import React from 'react';
import Modal from '../Modal/Modal'
import AppContainer from '../../containers/AppContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css'

function App() {
  return (
    <div className="container">
      <AppContainer/>
      <Modal/>
    </div>
  );
}

export default App;
