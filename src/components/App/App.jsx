import React from 'react';
import AppContainer from '../../containers/AppContainer';
import DeleteNodeModalContainer from '../../containers/modals/DeleteNodeModalContainer';
import EditNodeModalContainer from '../../containers/modals/EditNodeModalContainer';
import AddNodeModalContainer from '../../containers/modals/AddNodeModalContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css'



function App() {
  return (
    <div className="container">
      <AppContainer/>
      <DeleteNodeModalContainer/>
      <EditNodeModalContainer/>
      <AddNodeModalContainer/>
    </div>
  );
}

export default App;
