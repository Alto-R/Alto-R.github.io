// src/pages/About.jsx
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const researchInterests = t('about.researchInterests', { returnObjects: true });

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{t('about.title')}</h1>

        {/* Introduction Section */}
        <section className="about-section">
          <p className="about-intro">
            <Trans i18nKey="about.intro" components={{ 1: <strong /> }} />
          </p>

          <p className="about-text">
            {t('about.paragraph1')}
          </p>

          <p className="about-text">
            {t('about.paragraph2')}
          </p>
        </section>

        {/* Research Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('about.researchTitle')}</h2>
          <div className="skills-list">
            {researchInterests.map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="resume-section">
          <h2 className="section-title">{t('about.contactTitle')}</h2>
          <div className="contact-info">
            <p className="about-text">
              {t('about.contactText')}
            </p>
            <div className="contact-links">
              <a href="mailto:2501212708@stu.pku.edu.cn" className="contact-link">
                <span>{t('about.email')}</span>
              </a>
              <a href="https://github.com/Alto-R" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>{t('about.github')}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Fun Fact */}
        <section className="about-section" style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p className="about-text" style={{fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
            {t('about.quote')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
