import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget /> 
    </div>
  );
}

export default App;