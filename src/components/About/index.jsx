import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faGraduationCap,
  faToolbox
} from '@fortawesome/free-solid-svg-icons';
import * as simpleIcons from '@icons-pack/react-simple-icons/dist/index';
import headshot from '../../assets/images/author-headshot.png';
import './styles.scss';

/** About component. */
export default function About() {
  const icons = [
    simpleIcons.Html5,
    simpleIcons.CssThree,
    simpleIcons.Sass,
    simpleIcons.Javascript,
    simpleIcons.Nodedotjs,
    simpleIcons.Latex,
    simpleIcons.ReactJs,
    simpleIcons.Express,
    simpleIcons.Mongodb,
    simpleIcons.Firebase,
    simpleIcons.Git,
    simpleIcons.Npm,
    simpleIcons.Webpack,
    simpleIcons.Babel,
    simpleIcons.Postcss,
    simpleIcons.Gnuemacs,
    simpleIcons.Visualstudiocode
  ];

  return (
    <div id="section-about-me" className="page-section">
      <article className="about-me">
        <h2 className="about-me__heading">
          <span className="color-secondary">Ab</span>out me
          <FontAwesomeIcon icon={faCircleQuestion} />
        </h2>
        <div className="about-me__content">
          <section className="about-me__description">
            <p>
              Hello, my name is Ethan Schmidt and I&apos;m a Web Developer based
              out of Calgary, Alberta. I primarily specialize in core web
              technologies and the MERN stack, where I enjoy building both
              front-end and full-stack web applications.
            </p>
            <p>
              With every project I aim to apply my skills to their fullest and
              create unique experiences that are memorable. In my freetime, I
              like to experiment with new technologies, learn new skills, and
              dedicate my time to personal projects.
            </p>
          </section>
          <img
            className="about-me__photo"
            src={headshot}
            alt="Photograph of me."
          />
          <section className="about-me__education">
            <h3 className="about-me__education-heading">
              Education
              <FontAwesomeIcon icon={faGraduationCap} />
            </h3>
            <section className="about-me__degree" aria-label="degree details">
              <p className="about-me__degree-institution">
                University of Calgary
              </p>
              <p className="about-me__degree-location">Calgary, AB</p>
              <p className="about-me__degree-type">BSc. Mathematics</p>
              <p className="about-me__degree-time">
                <time>2016</time>&ndash;<time>2021</time>
              </p>
            </section>
          </section>
          <section className="about-me__skills">
            <h3 className="about-me__skills-heading">
              Skills and Tools
              <FontAwesomeIcon icon={faToolbox} />
            </h3>
            <ul className="about-me__skill-icons">
              {icons.map((Icon, index) => (
                <li key={index}>
                  <Icon size={32} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
