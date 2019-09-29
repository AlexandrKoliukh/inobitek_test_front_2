import React from 'react';
import Tree from '../Tree';
import Modal from '../Modal'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../Header/Header';

import './app.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <Tree/>
      <Modal/>
    </div>
  );
}

export default App;
