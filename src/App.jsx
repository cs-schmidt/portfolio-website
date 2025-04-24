import React, { lazy } from 'react';
import TimedSuspense from './components/Timed-Suspense';
import './app.scss';

// Lazy-loaded components
const MainNavbar = lazy(() => import('./components/Main-Navbar'));
const MainBackground = lazy(() => import('./components/Main-Background'));

export default function App() {
  return (
    <div>
      <TimedSuspense minTime={2000}>
        <MainNavbar />
        <MainBackground />
      </TimedSuspense>
    </div>
  );
}
