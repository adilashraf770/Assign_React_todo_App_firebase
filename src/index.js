import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from 'contexts/AuthContext'
import InputContextProvider from 'contexts/InputContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InputContextProvider>
        <Router >
          <App />
        </Router>
      </InputContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
