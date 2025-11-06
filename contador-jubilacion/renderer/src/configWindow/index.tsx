import React from 'react';
import { createRoot } from 'react-dom/client';
import ConfigApp from './screens/ConfigApp';

const container = document.getElementById('root');
if (!container) throw new Error('No se encontró root en config window');
createRoot(container).render(<ConfigApp />);
