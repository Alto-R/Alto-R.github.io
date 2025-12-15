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
          <div className="project-card">
            <h2 className="project-title">{t('projects.items.0.title')}</h2>
            <p className="project-description">{t('projects.items.0.description')}</p>

            <div className="videos-container">
              <div className="video-wrapper">
                <iframe
                  src="//player.bilibili.com/player.html?bvid=BV1Cw411k7yz&autoplay=0"
                  allowFullScreen
                  className="project-video"
                />
              </div>
              <div className="video-wrapper">
                <video
                  src="https://res.cloudinary.com/dj5oohbni/video/upload/mappo_demo_lsuoiq.mp4"
                  controls
                  className="project-video"
                />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default Projects;
