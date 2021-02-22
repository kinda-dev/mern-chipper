// configure our root component with the hash router 
// and provide the store to each sub-component:

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root;