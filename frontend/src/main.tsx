import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Internal } from './pages/Internal';
import { Invitation } from './pages/Invitation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/internal" element={<Internal />} />
        <Route path="/:id" element={<Invitation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
