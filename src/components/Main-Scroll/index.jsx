import React from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import PropTypes from 'prop-types';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './styles.scss';

/* The site-wide component providing locomotive scrolling of an entire page. */
export default function MainScroll({ scrollContainerRef, children }) {
  return (
    <LocomotiveScrollProvider
      containerRef={scrollContainerRef}
      options={{
        smooth: true,
        touchMultiplier: 2.5,
        smartphone: { smooth: true },
        gestureDirection: 'vertical'
      }}
      watch={[]}
    >
      {children}
    </LocomotiveScrollProvider>
  );
}

MainScroll.propTypes = {
  scrollContainerRef: PropTypes.object,
  children: PropTypes.node
};
