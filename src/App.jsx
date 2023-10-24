import React, { lazy, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import ErrorBoundary from './components/Error-Boundary';
import TimedSuspense from './components/Timed-Suspense';
import LoadingScreen from './components/Loading-Screen';
import './app.scss';

// Lazy-loaded components
const MainScroll = lazy(() => import('./components/Main-Scroll'));
const MainNavbar = lazy(() => import('./components/Main-Navbar'));
const MainBackground = lazy(() => import('./components/Main-Background'));

export default function App() {
  const scrollContainerRef = useRef();

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
        <MainScroll scrollContainerRef={scrollContainerRef}>
          <MainNavbar />
          <div className="scroll-wrapper">
            <div data-scroll-container ref={scrollContainerRef} />
          </div>
        </MainScroll>
        <MainBackground />
      </TimedSuspense>
    </ErrorBoundary>
  );
}
