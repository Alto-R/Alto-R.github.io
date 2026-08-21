import { useTranslation } from 'react-i18next';
import { BlurFade } from '../components/BlurFade';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="content-wrapper projects-content">
        <h1 className="page-title">
          <BlurFade delay={0.1} inView>
            {t('projects.title')}
          </BlurFade>
        </h1>

        <BlurFade delay={0.2} inView>
          <div className="projects-row">
            <div className="project-card">
              <h2 className="project-title">{t('projects.items.0.title')}</h2>
              <p className="project-description">{t('projects.items.0.description')}</p>
              <a
                className="project-link"
                href="https://github.com/Alto-R/SignalNest"
                target="_blank"
                rel="noreferrer"
              >
                → https://github.com/Alto-R/SignalNest
              </a>
            </div>

            <div className="project-card">
              <h2 className="project-title">{t('projects.items.1.title')}</h2>
              <p className="project-description">{t('projects.items.1.description')}</p>
              <div className="video-wrapper">
                <iframe
                  src="//player.bilibili.com/player.html?bvid=BV1Cw411k7yz&autoplay=0"
                  allowFullScreen
                  className="project-video"
                />
              </div>
            </div>

            <div className="project-card">
              <h2 className="project-title">{t('projects.items.2.title')}</h2>
              <p className="project-description">{t('projects.items.2.description')}</p>
              <div className="video-wrapper">
                <video
                  src="https://res.cloudinary.com/dj5oohbni/video/upload/mappo_vrp_lhtz5o.mp4"
                  poster="https://res.cloudinary.com/dj5oohbni/video/upload/so_5/mappo_vrp_lhtz5o.jpg"
                  controls
                  className="project-video"
                />
              </div>
            </div>

            <div className="project-card">
              <h2 className="project-title">{t('projects.items.3.title')}</h2>
              <p className="project-description">{t('projects.items.3.description')}</p>
              <a
                className="project-link"
                href="https://yunxiao3dgs.smallworldai.com/"
                target="_blank"
                rel="noreferrer"
              >
                → https://yunxiao3dgs.smallworldai.com/
              </a>
            </div>

            <div className="project-card">
              <h2 className="project-title">{t('projects.items.4.title')}</h2>
              <p className="project-description">{t('projects.items.4.description')}</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default Projects;
