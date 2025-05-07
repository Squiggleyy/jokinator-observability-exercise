import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize Observe BRUM
import { init as initApm } from '@elastic/apm-rum';//This initializes the elastic agent for Observe BRUM!
initApm({
  environment: 'luke_test',
  serviceName: 'react_frontend',
  serverUrlPrefix: '?environment=<YOUR_ENVIRONMENT>&serviceName=<YOUR_SERVICE_NAME>',
  serverUrl: 'https://100112502756.collect.observeinc.com/v1/http/rum',
  breakdownMetrics: true,
  distributedTracingOrigins: ['*'],
  distributedTracingHeaderName: 'X-Observe-Rum-Id',
  propagateTracestate: true,
  logLevel: 'error',
  session:true,
  apiVersion: 2,
  apmRequest({ xhr }) {
    xhr.setRequestHeader('Authorization', 'Bearer ds1uWf067JXARxBx6EcC:eAFoMCeOdYPqs8tZRd-Z4GRgR9JFv-Yy')
    return true
  }
});


  // Render the app after everything is ready
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Optional: Web Vitals reporting
  reportWebVitals();

// Load runtime config from backend
fetch('/config.json')
  .then((res) => res.json())
  .then((config) => {
    // Inject the API URL globally
    window.REACT_APP_API_URL = config.API_URL;
    })
  .catch((error) => {
    console.error('❌ Failed to load config.json or initialize app:', error);
  });