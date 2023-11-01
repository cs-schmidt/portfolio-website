import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import App from './App';

// Firebase Configuration
initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: 'AIzaSyBjpFFBMc8zu6N7iwm6bYkjLXL2zlCZl18',
  authDomain: 'portfolio-website-e9666.firebaseapp.com',
  projectId: 'portfolio-website-e9666',
  storageBucket: 'portfolio-website-e9666.appspot.com',
  messagingSenderId: '331455746118',
  appId: '1:331455746118:web:2bcdfba3f761b2ce507a47',
  measurementId: 'G-HSCS6L0XF6'
});

// Create react root and mount application to DOM.
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
