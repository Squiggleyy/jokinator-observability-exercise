//Here is all the "normal" stuff:
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Initializing BRUM!
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
