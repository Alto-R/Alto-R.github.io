// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">About Me</h1>

        {/* Introduction Section */}
        <section className="about-section">
          <p className="about-intro">
            Hi, I'm <strong>Alto-R</strong>, a researcher and developer passionate about advancing the frontiers
            of artificial intelligence and computer vision. My work focuses on developing innovative solutions
            that bridge the gap between theoretical research and practical applications.
          </p>

          <p className="about-text">
            With a background in deep learning and neural networks, I explore how machines can better understand
            and interact with the visual world. My research spans from low-level image processing to high-level
            scene understanding, with a particular interest in efficient model architectures for resource-constrained
            environments.
          </p>

          <p className="about-text">
            Beyond research, I enjoy building interactive experiences and tools that showcase the creative
            potential of AI. Whether it's developing web applications with cutting-edge technologies or
            experimenting with generative models, I'm always excited to explore new possibilities.
          </p>
        </section>

        {/* Research Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">Research Interests</h2>
          <div className="skills-list">
            <span>Computer Vision</span>
            <span>Deep Learning</span>
            <span>Generative AI</span>
            <span>Edge Computing</span>
            <span>Neural Architecture Search</span>
            <span>Multimodal Learning</span>
          </div>
        </section>

        {/* Contact Section */}
        <section className="resume-section">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-info">
            <p className="about-text">
              Feel free to reach out for collaborations, research discussions, or just to say hi!
            </p>
            <div className="contact-links">
              <a href="mailto:alto-r@example.com" className="contact-link">
                <span>Email</span>
              </a>
              <a href="https://github.com/alto-r" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com/alto-r" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>

        {/* Fun Fact */}
        <section className="about-section" style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p className="about-text" style={{fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
            "The best way to predict the future is to invent it." - Alan Kay
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
