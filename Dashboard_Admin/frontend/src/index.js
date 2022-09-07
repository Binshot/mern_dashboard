import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Page from "./login"
import { StyledEngineProvider } from '@mui/material/styles';

import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

