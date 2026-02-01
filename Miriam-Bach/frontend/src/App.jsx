import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import RSVPForm from './components/RSVPForm';
import './index.css';

function App() {
  const [showNoButton, setShowNoButton] = useState(true);

  const handleYesClick = () => {
    document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        // If the RSVP section is in view, hide the "No" button
        if (rect.top <= window.innerHeight / 2) {
          setShowNoButton(false);
        } else {
          setShowNoButton(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Hero onYesClick={handleYesClick} showNoButton={showNoButton} />
      <RSVPForm />
    </div>
  );
}

export default App;
