import React from 'react';
import Tree from '../Tree/Tree';
import Row from '../Row/Row';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Row left={<Tree/>} right={<div/>}/>
    </div>
  );
}

export default App;
