// src/pages/Publications.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Publications = () => {
  const { t } = useTranslation();
  const [expandedIds, setExpandedIds] = useState(new Set());

  const CHAR_LIMIT = 250;
  const publications = t('publications.items', { returnObjects: true });

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getDisplayAbstract = (pub) => {
    const isExpanded = expandedIds.has(pub.id);
    if (isExpanded || pub.abstract.length <= CHAR_LIMIT) {
      return pub.abstract;
    }
    return pub.abstract.substring(0, CHAR_LIMIT) + '...';
  };

  // Helper function to render authors with formatting
  const renderAuthors = (authorsText) => {
    // Replace **text** with <strong>text</strong> and handle superscripts
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

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{t('publications.title')}</h1>

        <div className="publications-grid">
          {publications.map((pub) => {
            const isExpanded = expandedIds.has(pub.id);
            const needsToggle = pub.abstract.length > CHAR_LIMIT;

            return (
              <div key={pub.id} className="pub-card">
                <div className="pub-header">
                  <span className="pub-year">{pub.year}</span>
                  <span className="pub-venue">{pub.venue}</span>
                </div>
                <h2 className="pub-title">{pub.title}</h2>
                <p className="pub-authors">{renderAuthors(pub.authors)}</p>
                <p className="pub-abstract">
                  {getDisplayAbstract(pub)}
                  {needsToggle && (
                    <button
                      className="abstract-toggle"
                      onClick={() => toggleExpand(pub.id)}
                    >
                      {isExpanded ? t('publications.showLess') : t('publications.readMore')}
                    </button>
                  )}
                </p>

                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">{t('publications.pdfLink')}</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Publications;
