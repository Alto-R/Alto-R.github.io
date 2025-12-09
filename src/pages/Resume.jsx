// src/pages/Resume.jsx
import React from 'react';

const Resume = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Resume</h1>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          <div className="resume-item">
            <div className="resume-date">2023 - Present</div>
            <div className="resume-content">
              <h3>Ph.D. in Computer Science</h3>
              <p className="institution">Peking University, China</p>
              <p className="description">Focus on Computer Vision and Generative AI.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">2019 - 2023</div>
            <div className="resume-content">
              <h3>B.S. in Computer Science</h3>
              <p className="institution">Top University</p>
              <p className="description">GPA: 3.9/4.0. Awarded National Scholarship.</p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">Experience</h2>
          <div className="resume-item">
            <div className="resume-date">Summer 2024</div>
            <div className="resume-content">
              <h3>Research Intern</h3>
              <p className="institution">Microsoft Research Asia (MSRA)</p>
              <p className="description">Worked on large language model alignment. Published 1 paper at ICLR.</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            <span>Python</span>
            <span>PyTorch</span>
            <span>React</span>
            <span>Three.js</span>
            <span>C++</span>
            <span>LaTeX</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;