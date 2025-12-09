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
            Hi, I'm <strong>Churui Huang</strong>, a postgraduate student at Peking University pursuing my Master's degree
            in Smart City and Big Data. I am passionate about leveraging data-driven approaches and advanced
            computational techniques to address the complex challenges facing modern urban systems.
          </p>

          <p className="about-text">
            My research interests lie at the intersection of smart cities and big data, with a particular focus on
            convex optimization and reinforcement learning. I am fascinated by how these powerful mathematical and
            computational frameworks can be applied to optimize urban infrastructure, improve resource allocation,
            and enhance the overall quality of life in cities. From transportation networks to energy systems,
            I believe intelligent algorithms can unlock significant efficiency gains and sustainability benefits.
          </p>

          <p className="about-text">
            Through my academic journey and research projects, I strive to develop practical solutions that can
            translate theoretical advances into real-world impact. Whether it's analyzing large-scale urban datasets,
            designing optimization algorithms for complex systems, or building decision-support tools for urban
            planners, I aim to contribute to building more intelligent, efficient, and livable cities for the future.
          </p>
        </section>

        {/* Research Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">Research Interests</h2>
          <div className="skills-list">
            <span>Smart Cities</span>
            <span>Big Data Analytics</span>
            <span>Convex Optimization</span>
            <span>Reinforcement Learning</span>
            <span>Urban Computing</span>
            <span>Transportation Systems</span>
            <span>Energy Systems</span>
            <span>Data-Driven Decision Making</span>
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
              <a href="mailto:2501212708@stu.pku.edu.cn" className="contact-link">
                <span>Email</span>
              </a>
              <a href="https://github.com/Alto-R" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Fun Fact */}
        <section className="about-section" style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p className="about-text" style={{fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
            "Le vent se lève, il faut tenter de vivre"
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
