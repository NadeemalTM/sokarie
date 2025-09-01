import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Customize Your Style</h1>
        <p>High-quality t-shirts, yoga pants, and sportswear tailored to you.</p>
        <button className="cta-button">Shop Now</button>
      </motion.div>
      <div className="hero-image">
        <img src="/images/hero.jpg" alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;
