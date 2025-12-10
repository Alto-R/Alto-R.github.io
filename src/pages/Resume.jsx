// src/pages/Resume.jsx
import { useTranslation } from 'react-i18next';

const Resume = () => {
  const { t } = useTranslation();

  const education = t('resume.education.items', { returnObjects: true });
  const research = t('resume.research.items', { returnObjects: true });
  const projects = t('resume.projects.items', { returnObjects: true });
  const internship = t('resume.internship.items', { returnObjects: true });
  const activities = t('resume.activities.items', { returnObjects: true });
  const skills = t('resume.skills.items', { returnObjects: true });
  const languageSkills = t('resume.languageSkills.items', { returnObjects: true });
  const interests = t('resume.interests.items', { returnObjects: true });

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{t('resume.title')}</h1>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.education.title')}</h2>
          {education.map((item, index) => (
            <div className="resume-item" key={index}>
              <div className="resume-date">{item.date}</div>
              <div className="resume-content">
                <h3>{item.degree}</h3>
                <p className="institution">{item.institution}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Research & Publications Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.research.title')}</h2>
          {research.map((item, index) => (
            <div className="resume-item" key={index}>
              <div className="resume-date">{item.date}</div>
              <div className="resume-content">
                <h3>{item.title}</h3>
                <p className="institution">{item.institution}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Project Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.projects.title')}</h2>
          {projects.map((item, index) => (
            <div className="resume-item" key={index}>
              <div className="resume-date">{item.date}</div>
              <div className="resume-content">
                <h3>{item.title}</h3>
                <p className="institution">{item.institution}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Internship Experience Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.internship.title')}</h2>
          {internship.map((item, index) => (
            <div className="resume-item" key={index}>
              <div className="resume-date">{item.date}</div>
              <div className="resume-content">
                <h3>{item.title}</h3>
                <p className="institution">{item.institution}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Campus Activities Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.activities.title')}</h2>
          {activities.map((item, index) => (
            <div className="resume-item" key={index}>
              <div className="resume-date">{item.date}</div>
              <div className="resume-content">
                <h3>{item.title}</h3>
                <p className="institution">{item.institution}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.skills.title')}</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Language Proficiency Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.languageSkills.title')}</h2>
          <div className="skills-list">
            {languageSkills.map((lang, index) => (
              <span key={index}>{lang}</span>
            ))}
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('resume.interests.title')}</h2>
          <div className="skills-list">
            {interests.map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
