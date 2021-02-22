import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// importing axios to fetch info from our server
import axios from 'axios';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// putting axios on the window to test, need to add "proxy to package.json" 
// can test in the console, example: --- axios.get("/api/users/test")
window.axios = axios;
