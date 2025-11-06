/**
 * Componente principal de la aplicación
 * Renderiza el contador de jubilación
 */

import React from 'react';
import Counter from './components/Counter';

const App: React.FC = () => {
  return (
    <div className="app">
      <Counter />
    </div>
  );
};

export default App;
