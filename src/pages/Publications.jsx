// src/pages/Publications.jsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { BlurFade } from '../components/BlurFade';
import './Publications.css';

// Cloudinary image mapping for publications
const publicationImages = {
  1: 'carbon_emission_qi343r',  // Carbon emission paper
  2: 'island_udfics',           // Island paper
  3: 'EVIPV_e7drs3',            // EVIPV paper
  // id 4 (review paper) has no image
};

const getCloudinaryUrl = (publicId, width = 600) => {
  return `https://res.cloudinary.com/dj5oohbni/image/upload/w_${width},c_fill,q_auto,f_auto/${publicId}`;
};

const Publications = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);
  const publications = t('publications.items', { returnObjects: true });
  const modalRef = useRef(null);

  // Helper function to render authors with formatting
  const renderAuthors = (authorsText) => {
    const parts = authorsText.split(/(\*\*.*?\*\*|\^.*?\^)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('^') && part.endsWith('^')) {
        return <sup key={index}>{part.slice(1, -1)}</sup>;
      }
      return part;
    });
  };

  // Close modal when clicking outside
  useOutsideClick(modalRef, () => setActiveId(null));

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveId(null);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeId]);

  const activePub = publications.find(pub => pub.id === activeId);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">
          <BlurFade delay={0.1} inView>
            {t('publications.title')}
          </BlurFade>
        </h1>

        <div className="publications-grid">
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              layoutId={`card-${pub.id}`}
              onClick={() => setActiveId(pub.id)}
              className="pub-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="pub-card-content">
                <motion.div layoutId={`header-${pub.id}`} className="pub-header">
                  <span className="pub-year">{pub.year}</span>
                  <span className="pub-venue">{pub.venue}</span>
                </motion.div>

                <motion.h2 layoutId={`title-${pub.id}`} className="pub-title">
                  {pub.title}
                </motion.h2>

                <motion.p layoutId={`authors-${pub.id}`} className="pub-authors">
                  {renderAuthors(pub.authors)}
                </motion.p>

                <p className="pub-abstract-preview">
                  {pub.abstract.substring(0, 150)}...
                </p>

                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={pub.link}
                    className="pub-link-compact"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    → PDF
                  </a>
                </div>
              </div>

              {publicationImages[pub.id] && (
                <div className="pub-card-image">
                  <img
                    src={getCloudinaryUrl(publicationImages[pub.id], 400)}
                    alt={pub.title}
                    loading="lazy"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {activeId && activePub && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="modal-backdrop"
                onClick={() => setActiveId(null)}
              />

              {/* Modal Content */}
              <div className="modal-container">
                <motion.div
                  ref={modalRef}
                  layoutId={`card-${activeId}`}
                  className={`modal-content ${publicationImages[activeId] ? 'modal-with-image' : ''}`}
                >
                  {/* Close Button */}
                  <button
                    className="modal-close"
                    onClick={() => setActiveId(null)}
                    aria-label="Close"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <motion.div
                    layoutId={`header-${activeId}`}
                    className="pub-header"
                  >
                    <span className="pub-year">{activePub.year}</span>
                    <span className="pub-venue">{activePub.venue}</span>
                  </motion.div>

                  <motion.h2
                    layoutId={`title-${activeId}`}
                    className="pub-title"
                  >
                    {activePub.title}
                  </motion.h2>

                  <motion.p
                    layoutId={`authors-${activeId}`}
                    className="pub-authors"
                  >
                    {renderAuthors(activePub.authors)}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="modal-body"
                  >
                    <h3 className="abstract-title">{t('publications.abstractTitle') || 'Abstract'}</h3>

                    <div className="abstract-content">
                      {publicationImages[activeId] && (
                        <motion.div
                          className="modal-image-float"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 }}
                        >
                          <img
                            src={getCloudinaryUrl(publicationImages[activeId], 600)}
                            alt={activePub.title}
                          />
                        </motion.div>
                      )}
                      <p className="pub-abstract-full">{activePub.abstract}</p>
                    </div>

                    <div className="pub-footer">
                      <div className="pub-tags">
                        {activePub.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <a
                        href={activePub.link}
                        className="pub-link-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('publications.pdfLink')}
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Publications;
