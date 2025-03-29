import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Create react root and mount application to DOM.
const root = createRoot(document.querySelector('#root'));
root.render(<App />);
