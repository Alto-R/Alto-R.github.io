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
            <div className="resume-date">2025.09 - Present</div>
            <div className="resume-content">
              <h3>Master's in Smart City and Big Data</h3>
              <p className="institution">Peking University, College of Urban Planning and Design</p>
              <p className="description">Focus on smart city planning and data-driven urban design.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">2020.09 - 2025.07</div>
            <div className="resume-content">
              <h3>B.S. in Urban and Rural Planning</h3>
              <p className="institution">Peking University, College of Urban and Environmental Sciences</p>
              <p className="description">Comprehensive training in urban planning, design, and environmental studies.</p>
            </div>
          </div>
        </section>

        {/* Research & Publications Section */}
        <section className="resume-section">
          <h2 className="section-title">Research & Publications</h2>
          <div className="resume-item">
            <div className="resume-date">Published</div>
            <div className="resume-content">
              <h3>Carbon emission implications of toll discount policies and network expansions in highway</h3>
              <p className="institution">Transportation Research Part D (First Author)</p>
              <p className="description">Analyzed the impact of highway toll discount policies and network expansions on carbon emissions.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">Under Review</div>
            <div className="resume-content">
              <h3>A global feasibility gap in resilient island energy transitions</h3>
              <p className="institution">Nature Communications</p>
              <p className="description">Examined challenges in achieving resilient energy transitions for island systems globally.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">Submitted</div>
            <div className="resume-content">
              <h3>Climate Change Reshaping Global Energy Systems: A Review of Supply-Demand-Network Dynamics and 
Regional Resilience</h3>
              <p className="institution">Nature Reviews</p>
              <p className="description">Comprehensive review of supply-demand-network dynamics and regional resilience in energy systems.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">Submitted</div>
            <div className="resume-content">
              <h3>Power generation potential evaluation on electric vehicle integrated photovoltaic: A case study of Shanghai's 
taxi fleet</h3>
              <p className="institution">Applied Energy</p>
              <p className="description">Case study evaluating photovoltaic integration potential in Shanghai's taxi fleet.</p>
            </div>
          </div>
        </section>

        {/* Project Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">Project Experience</h2>
          <div className="resume-item">
            <div className="resume-date">PKU Research</div>
            <div className="resume-content">
              <h3>基于社交媒体数据与用户需求的游憩线路推荐系统构建</h3>
              <p className="institution">Peking University Research Training Program</p>
              <p className="description">Independently developed a recreation route recommendation system based on social media data and user preferences.</p>
            </div>
          </div>
        </section>

        {/* Internship Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">Internship Experience</h2>
          <div className="resume-item">
            <div className="resume-date">2024.08 - 2024.11</div>
            <div className="resume-content">
              <h3>Backend Developer Intern</h3>
              <p className="institution">Urban Planning & Design Institute of Shenzhen (UPDIS)</p>
              <p className="description">Responsible for backend development of Shenzhen's Mountain-Sea Connection Smart Navigation System.</p>
            </div>
          </div>
        </section>

        {/* Campus Activities Section */}
        <section className="resume-section">
          <h2 className="section-title">Campus Activities</h2>
          <div className="resume-item">
            <div className="resume-date">2023.09 - 2024.09</div>
            <div className="resume-content">
              <h3>Peer Counselor</h3>
              <p className="institution">Peking University, College of Urban and Environmental Sciences</p>
              <p className="description">Assisted with daily student management and provided support to fellow students.</p>
            </div>
          </div>
          <div className="resume-item">
            <div className="resume-date">2022.09 - 2023.09</div>
            <div className="resume-content">
              <h3>Director of Volunteer Service Department</h3>
              <p className="institution">Peking University, College of Urban and Environmental Sciences</p>
              <p className="description">Led team training, managed reimbursements, and coordinated all volunteer service activities.</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="section-title">Professional Skills</h2>
          <div className="skills-list">
            <span>Python</span>
            <span>SPSS</span>
            <span>MATLAB</span>
            <span>JavaScript</span>
            <span>AutoCAD</span>
            <span>SketchUp</span>
            <span>Photoshop</span>
            <span>Premiere</span>
            <span>Lightroom</span>
          </div>
        </section>

        {/* Language Proficiency Section */}
        <section className="resume-section">
          <h2 className="section-title">Language Proficiency</h2>
          <div className="skills-list">
            <span>English (CET-6: 563)</span>
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">Personal Interests</h2>
          <div className="skills-list">
            <span>Photography</span>
            <span>Basketball</span>
            <span>Gaming</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;