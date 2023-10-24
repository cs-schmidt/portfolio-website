import React, { lazy, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import ErrorBoundary from './components/Error-Boundary';
import TimedSuspense from './components/Timed-Suspense';
import LoadingScreen from './components/Loading-Screen';
import './app.scss';

// Lazy-loaded components
const MainNavbar = lazy(() => import('./components/Main-Navbar'));
const MainBackground = lazy(() => import('./components/Main-Background'));

export default function App() {
  // Loading fallback.
  const loadingFallback = useCallback((waitedMinTime) => {
    const transitionDuration = 1500;
    return (
      // The `in` prop must be set to `true` initially, then the `exit-*`
      // classes will apply after it switches to `false`.
      <CSSTransition
        in={!waitedMinTime}
        timeout={{ appear: 0, enter: 0, exit: transitionDuration }}
        unmountOnExit
      >
        <LoadingScreen
          style={{ transitionDuration: `${transitionDuration}ms` }}
        />
      </CSSTransition>
    );
  }, []);

  return (
    <ErrorBoundary>
      <TimedSuspense minTime={2000} fallback={loadingFallback}>
        <MainNavbar />
        <MainBackground />
      </TimedSuspense>
    </ErrorBoundary>
  );
}
