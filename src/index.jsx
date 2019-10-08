import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App/App';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const dev = compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
);

const prod = compose(
    applyMiddleware(thunk)
);

const store = createStore(
  reducers,
    process.env.NODE_ENV === 'development' ? dev : prod,
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
