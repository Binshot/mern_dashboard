import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Page from "./login"
import { StyledEngineProvider } from '@mui/material/styles';

import { AuthContextProvider } from './context/AuthContext';
import { AnnouncementContextProvider } from './context/AnnouncementContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AnnouncementContextProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </AnnouncementContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

