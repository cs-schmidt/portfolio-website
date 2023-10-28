import React, { useState, useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faLaptopCode,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import throttle from '../../utils/throttle';
import classList from '../../utils/classList';
import logo from '../../assets/images/logo.svg';
import './styles.scss';

// The breakpoint at which to the menu toggle will be shown.
function isMobileBreakpoint() {
  return window.innerWidth < 600;
}

/** The site-wide navbar component. */
export default function MainNavbar() {
  const [isMobileView, setIsMobileView] = useState(isMobileBreakpoint());
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const { scroll } = useLocomotiveScroll();

  function navigateTo(scrollId) {
    return () => {
      scroll.scrollTo(scrollId);
      setIsMenuToggled(false);
    };
  }

  // Handles `isMobileView` state changes when window resizes.
  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => {
        if (isMobileBreakpoint()) setIsMobileView(true);
        else setIsMobileView(false);
      }, 50)
    );
  }, []);

  // Resets `isMenuToggled` state when the `isMobileView` state changes.
  useEffect(() => {
    if (isMenuToggled) setIsMenuToggled(false);
  }, [isMobileView]);

  return (
    <nav className="main-nav">
      {/* Navbar logo. */}
      <button
        className="main-nav__logo"
        type="button"
        onClick={navigateTo('top')}
        role="link"
        aria-label="back to top"
      >
        <img src={logo} alt="Navbar logo." />
      </button>
      {/* Navbar menu. */}
      <div
        className={classList(
          'main-nav__menu',
          isMenuToggled && 'main-nav__menu--toggled'
        )}
      >
        {/* Mobile menu toggle. */}
        {isMobileView && (
          <button
            className={classList(
              'main-nav__menu-toggle',
              isMenuToggled && 'main-nav__menu-toggle--toggled'
            )}
            type="button"
            onClick={function toggleMobileMenu() {
              if (isMobileView) setIsMenuToggled(!isMenuToggled);
            }}
            aria-label="mobile menu toggle"
          >
            <div className="main-nav__menu-toggle-bar" />
            <div className="main-nav__menu-toggle-bar" />
            <div className="main-nav__menu-toggle-bar" />
          </button>
        )}
        {/* Navbar menu section links. */}
        <ul className="main-nav__section-links">
          <li>
            <button
              type="button"
              onClick={navigateTo('#section-about-me')}
              role="link"
              aria-label="navigates to 'About me' section"
            >
              {isMobileView && <FontAwesomeIcon icon={faCircleQuestion} />}
              About
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={navigateTo('#section-projects')}
              role="link"
              aria-label="navigates to 'Projects' section"
            >
              {isMobileView && <FontAwesomeIcon icon={faLaptopCode} />}
              Projects
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={navigateTo()}
              role="link"
              aria-label="navigates to 'Contact' section"
            >
              {isMobileView && <FontAwesomeIcon icon={faEnvelope} />}
              Contact
            </button>
          </li>
        </ul>
        {/* Navbar menu external links. */}
        <ul className="main-nav__external-links">
          <li>
            <a
              href="https://github.com/CS-Schmidt"
              rel="author external noopener noreferrer"
              target="_blank"
              aria-label="GitHub profile"
            >
              <FontAwesomeIcon
                className="page-nav__icon-link"
                icon={faGithubSquare}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/cs-schmidt"
              rel="author external noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn profile"
            >
              <FontAwesomeIcon
                className="page-nav__icon-link"
                icon={faLinkedin}
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
