import React from 'react';

import 'semantic-ui-css/semantic.min.css'
import Tree from '../Tree/Tree';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Container>
        <Tree/>
      </Container>
      {/*<List>*/}
      {/*  <NodesList/>*/}
      {/*</List>*/}
    </div>
  );
}

export default App;
