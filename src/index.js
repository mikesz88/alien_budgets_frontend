import React, { StrictMode } from 'react';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_ENDPOINT;

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// eslint-disable-next-line no-undef
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
