import React from 'react';
import TypeIt from 'typeit-react';
import PropTypes from 'prop-types';
import './styles.scss';

function introTypingAnimation(instance) {
  instance
    .type('Hi there. I\'m <span class="color-secondary">Ethan</span>.')
    .break()
    .type('I\'m a <span class="color-secondary">Web Developer</span>.');
  return instance;
}

/** Intro component. */
export default function Intro({ start }) {
  return (
    <header className="intro" data-scroll-id="intro">
      {start && (
        <TypeIt
          className="intro__message"
          as="h1"
          options={{
            speed: 50,
            lifeLike: true,
            cursor: false
          }}
          getBeforeInit={introTypingAnimation}
          aria-label="Hi there. I'm Ethan. I'm a Web Developer."
          aria-hidden="true"
        />
      )}
    </header>
  );
}

Intro.propTypes = {
  start: PropTypes.bool
};

Intro.defaultProps = {
  start: false
};
