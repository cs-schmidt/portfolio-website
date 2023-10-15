import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';

/**
 * A component extending the functionality of `React.Suspense`. It allows a
 * fallback to be shown for a minimum amount of time before revealing
 * lazy-loaded children.
 */
export default function TimedSuspense({ minTime, fallback, children }) {
  const [waitedMinTime, setWaitedMinTime] = useState(false);
  const startTime = Date.now();

  return (
    <>
      {fallback ? fallback(waitedMinTime) : null}
      <Suspense fallback={null}>
        {!waitedMinTime && <PromiseThrower />}
        <Suspense
          fallback={
            <Notifier
              startTime={startTime}
              minTime={minTime}
              setWaitedMinTime={setWaitedMinTime}
            />
          }
        >
          {children}
        </Suspense>
      </Suspense>
    </>
  );
}

TimedSuspense.propTypes = {
  // The minimum delay before hiding the fallback.
  minTime: PropTypes.number,
  // Callback that sets up your fallback, it's passed the `waitedMinTime` state.
  fallback: PropTypes.func,
  children: PropTypes.node
};

TimedSuspense.defaultProps = {
  minTime: 0
};

/**
 * A component used by `SmartSuspense` called when lazy-loading completes,
 * controlling when the `waitedMinTime` state updates.
 */
function Notifier({ startTime, minTime, setWaitedMinTime }) {
  useEffect(
    () => () => {
      const timeLeft = minTime - (Date.now() - startTime);
      if (timeLeft > 0) setTimeout(() => setWaitedMinTime(true), timeLeft);
      else setWaitedMinTime(true);
    },
    []
  );

  return null;
}

Notifier.propTypes = {
  startTime: PropTypes.number.isRequired,
  minTime: PropTypes.number.isRequired,
  setWaitedMinTime: PropTypes.func.isRequired
};

/**
 * Used as a utility to pause the `SmartSuspense` component.
 * @throws {Promise}
 */
function PromiseThrower() {
  throw new Promise(() => {});
}
