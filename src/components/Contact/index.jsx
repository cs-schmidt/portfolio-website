import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import contactGraphic from '../../assets/images/contact-graphic.svg';
import './styles.scss';

/** Contact component. */
export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [messageValid, setMessageValid] = useState(false);
  const wasSubmitted = useRef(false);
  const emailInput = useRef();
  const messageInput = useRef();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  function submitHandler(e) {
    e.preventDefault();
    if (!wasSubmitted.current) wasSubmitted.current = true;
    if (emailValid && messageValid) {
      // const url ='http://127.0.0.1:5001/portfolio-website-e9666/us-central1/submitMessage';
      // const payload = JSON.stringify({ email, message });
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: payload
      // });
      // console.log(response);
      setEmail('');
      setMessage('');
    }
  }

  useEffect(() => {
    setEmailValid(emailRegex.test(email));
    if (wasSubmitted.current) {
      // Enable showing of validation states.
    }
  }, [email]);

  useEffect(() => {
    setMessageValid(message.length > 0);
    if (wasSubmitted.current) {
      // Enable showing of validation states.
    }
  }, [message]);

  return (
    <div id="section-contact" className="page-section">
      <footer className="contact">
        <h2 className="contact__heading">
          <span className="color-secondary">Con</span>tact
          <FontAwesomeIcon icon={faEnvelope} />
        </h2>
        <div className="contact__content">
          <section className="contact__info">
            <h3 className="contact__info-heading">Want to get in touch?</h3>
            <p className="contact__info-message">
              Feel free to send me an email using the available form, and
              I&apos;ll be sure to get back to you as soon as I can.
            </p>
          </section>
          <img
            className="contact__graphic"
            src={contactGraphic}
            alt="A man sitting on a phone sending messages."
          />
          <form className="contact__form" onSubmit={submitHandler}>
            <ul className="contact__form-controls">
              <li>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  ref={emailInput}
                  aria-required
                />
              </li>
              <li>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  ref={messageInput}
                  aria-required
                />
              </li>
            </ul>
            <button
              className="contact__form-btn"
              type="submit"
              disabled={!emailValid || !messageValid}
              aria-label="send email"
            >
              <span>Submit</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
