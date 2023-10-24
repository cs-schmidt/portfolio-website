import React from 'react';
import { ScaleLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import './styles.scss';

/** Loading screen component. */
export default function LoadingScreen({ style }) {
  return (
    <div className="loading-screen" style={style}>
      <ScaleLoader width={12} height={5 * 12} color="#ff715b" />
    </div>
  );
}

LoadingScreen.propTypes = {
  style: PropTypes.object
};

LoadingScreen.defaultProps = {
  style: null
};
