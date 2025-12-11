// src/pages/Resume.jsx
import { useTranslation } from 'react-i18next';
import { EncryptedText } from '@/components/encrypted-text';

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
        <h1 className="page-title">
          <EncryptedText
            text={t('resume.title')}
            encryptedClassName="text-neutral-500"
            revealedClassName=""
            revealDelayMs={10}
            encryptSpeed={15}  
          />
        </h1>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.education.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.research.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.projects.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.internship.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.activities.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.skills.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Language Proficiency Section */}
        <section className="resume-section">
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.languageSkills.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
          <div className="skills-list">
            {languageSkills.map((lang, index) => (
              <span key={index}>{lang}</span>
            ))}
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">
            <EncryptedText
              text={t('resume.interests.title')}
              encryptedClassName="text-neutral-500"
              revealedClassName=""
              revealDelayMs={10}
              encryptSpeed={15}  
            />
          </h2>
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
