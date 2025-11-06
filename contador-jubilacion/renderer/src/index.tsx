/**
 * Punto de entrada principal del proceso Renderer
 * Configura React y monta la aplicación en el DOM
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../styles/global.css';

// Obtener el elemento root del DOM
const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento root en el DOM');
}

// Crear root de React 18
const root = createRoot(container);

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
