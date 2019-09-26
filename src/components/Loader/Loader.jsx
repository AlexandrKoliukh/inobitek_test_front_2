import React from 'react'
import { Dimmer, Loader as Spinner } from 'semantic-ui-react'

const Loader = () => (
  <Dimmer active inverted>
    <Spinner size='large'>Loading</Spinner>
  </Dimmer>
);

export default Loader;
