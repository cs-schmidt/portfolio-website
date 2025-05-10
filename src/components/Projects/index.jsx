import React from 'react';
import * as simpleIcons from '@icons-pack/react-simple-icons/dist/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopCode,
  faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons';
import project1Photo from '../../assets/images/portfolio-website-screenshot.png';
import rectangle from '../../assets/images/rectangle.svg';
import './styles.scss';

/** Projects component. */
export default function Projects() {
  const project1Icons = [
    simpleIcons.Html5,
    simpleIcons.CssThree,
    simpleIcons.Sass,
    simpleIcons.Javascript,
    simpleIcons.ReactJs,
    simpleIcons.Threedotjs,
    simpleIcons.Firebase,
    simpleIcons.Webpack,
    simpleIcons.Babel,
    simpleIcons.Postcss
  ];

  const project2Icons = [
    simpleIcons.Html5,
    simpleIcons.Bootstrap,
    simpleIcons.Javascript,
    simpleIcons.ReactJs,
    simpleIcons.Redux,
    simpleIcons.Stripe,
    simpleIcons.Firebase,
    simpleIcons.Webpack,
    simpleIcons.Babel,
    simpleIcons.Postcss
  ];

  const project3Icons = [
    simpleIcons.Html5,
    simpleIcons.Bootstrap,
    simpleIcons.Javascript,
    simpleIcons.ReactJs,
    simpleIcons.Redux,
    simpleIcons.Chartdotjs,
    simpleIcons.Firebase,
    simpleIcons.Webpack,
    simpleIcons.Babel,
    simpleIcons.Postcss
  ];

  return (
    <div id="section-projects" className="page-section">
      <section className="projects">
        <h2 className="projects__heading">
          <span className="color-secondary">Pro</span>jects
          <FontAwesomeIcon icon={faLaptopCode} />
        </h2>
        <section className="projects__featured">
          {/* Project 1 */}
          <article className="project">
            <header className="project__header">
              <h3 className="project__heading">Personal Portfolio Website</h3>
              <div className="project__time-range">
                <time>Nov. 2022</time>&ndash;<time>Jan. 2023</time>
              </div>
            </header>
            <div className="project__content">
              <a
                className="project__photo"
                href="https://github.com/CS-Schmidt/portfolio-website"
                rel="author external noopener noreferrer"
                target="_blank"
                aria-label="project code repository"
              >
                <img
                  src={project1Photo}
                  alt="Portfolio website landing page."
                />
              </a>
              <p className="project__description">
                A modern scroll-based website build with React and Three.js. The
                website features typing effects, smooth scrolling effects, and a
                3D particle-driven background built on top of Three.js. This
                project is meant to serve as my web development resume,
                providing a unique experience, explaining my background, and
                offering ways to get in touch with me.
              </p>
              <ul className="project__technologies">
                {project1Icons.map((Icon, index) => (
                  <li key={index}>
                    <Icon size={32} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
          {/* Project 2 */}
          <article className="project">
            <header className="project__header">
              <h3 className="project__heading">Netflix Clone</h3>
              <div className="project__time-range">
                <time>Feb. 2023</time>&ndash;<time>Present</time>
              </div>
            </header>
            <div className="project__content">
              <a
                className="project__photo project__photo--ongoing"
                href="https://github.com/CS-Schmidt/netflix-clone"
                rel="author external noopener noreferrer"
                target="_blank"
                aria-label="project code repository"
              >
                <img src={rectangle} alt="background" />
                <FontAwesomeIcon icon={faScrewdriverWrench} />
              </a>
              <p className="project__description">
                Designed a sleek and responsive Netflix clone using React and
                Redux Toolkit. The project leverages Stripe to add payent and
                subscription options for potential users, and Firebase for the
                back-end.
              </p>
              <ul className="project__technologies">
                {project2Icons.map((Icon, index) => (
                  <li key={index}>
                    <Icon size={32} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
          {/* Project 3 */}
          <article className="project">
            <header className="project__header">
              <h3 className="project__heading">Coin Market Tracker</h3>
              <div className="project__time-range">
                <time>Mar. 2023</time>&ndash;<time>Present</time>
              </div>
            </header>
            <div className="project__content">
              <a
                className="project__photo project__photo--ongoing"
                href="https://github.com/CS-Schmidt/coin-market-tracker"
                rel="author external noopener noreferrer"
                target="_blank"
                aria-label="project code repository"
              >
                <img src={rectangle} alt="background" />
                <FontAwesomeIcon icon={faScrewdriverWrench} />
              </a>
              <p className="project__description">
                Created a cryptocurrency web platform which shows the latest
                coins, prices, and market news. The project leverages Chart.js
                to produce multiple interactive graphs for market performance,
                enhancing data clarity for users through the use of RapidAPI.
              </p>
              <ul className="project__technologies">
                {project3Icons.map((Icon, index) => (
                  <li key={index}>
                    <Icon size={32} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
