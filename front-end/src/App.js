import React from 'react';
import { AppProvider } from './context/AppContext';

import Routes from './routes';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
