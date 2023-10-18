import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './styles.scss';

/** App-wide error boundary component. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // On error updates the state to show fallback.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <main className="main-error">
          <div className="main-error__message" role="alert">
            <h1 className="main-error__heading">
              <span className="color-secondary">Oops</span>, something went
              wrong.
            </h1>
            <p className="main-error__description">
              It seems your network connection was interrupted while fetching
              the webpage. Please refresh your view by clicking the button
              below.
            </p>
            <button
              className="main-error__btn"
              type="button"
              onClick={function reload() {
                window.location.reload();
              }}
              aria-label="refresh page"
            >
              <span>Refresh</span>
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </main>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
