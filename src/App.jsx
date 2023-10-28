import React, { lazy, useState, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import ErrorBoundary from './components/Error-Boundary';
import TimedSuspense from './components/Timed-Suspense';
import LoadingScreen from './components/Loading-Screen';
import './app.scss';

// Lazy-loaded components
const MainScroll = lazy(() => import('./components/Main-Scroll'));
const MainNavbar = lazy(() => import('./components/Main-Navbar'));
const Intro = lazy(() => import('./components/Intro'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const MainBackground = lazy(() => import('./components/Main-Background'));

/** App component. */
export default function App() {
  const [doneLoading, setIsDoneLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  // Loading fallback.
  const loadingFallback = useCallback((waitedMinTime) => {
    const transitionDuration = 1500;
    return (
      // The `in` prop must be set to `true` initially, then the `exit-*`
      // classes will apply after it switches to `false`.
      <CSSTransition
        in={!waitedMinTime}
        timeout={{ appear: 0, enter: 0, exit: transitionDuration }}
        onExited={() => {
          setIsDoneLoading(true);
        }}
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
            <div data-scroll-container ref={scrollContainerRef}>
              <Intro start={doneLoading} />
              <main>
                <About />
                <Projects />
              </main>
              <Contact />
            </div>
          </div>
        </MainScroll>
        <MainBackground />
      </TimedSuspense>
    </ErrorBoundary>
  );
}
