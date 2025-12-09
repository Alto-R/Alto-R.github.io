// src/pages/Publications.jsx
import React, { useState } from 'react';

// Research publications
const publications = [
  {
    id: 1,
    title: "Carbon emission implications of toll discount policies and network expansions in highway",
    authors: <>Han Yang<sup>†</sup>, <strong>Churui Huang</strong><sup>†</sup>, Qing Yu<sup>*</sup>, et al.</>,
    venue: "Transportation Research Part D",
    year: "Published",
    abstract: "Highways account for a significant share of transportation-related CO2 emissions, yet policy interventions in mitigating these emissions remain underexplored. This paper investigates the impact of toll discount policies and network expansions on highway carbon emissions, drawing on long-term Electronic Toll Collection (ETC) data. We propose a bottom-up framework for estimating highway emissions and use a combination of time series decomposition and causal inference methods to isolate policy impacts. Our results reveal that toll discounts exert a significant and positive effect on highway carbon emissions, the shift of freight traffic onto highways reduces overall system-wide emissions: on average, each kilometer of discounted highway travel yields a net reduction of 52 g of CO2 per day in the transportation network. These findings underscore both the potential of policy-driven highway utilization to lower total carbon footprints and the importance of carefully calibrated policies to manage induced passenger travel.",
    tags: ["Transportation", "Carbon Emissions", "Policy Analysis"],
    link: "https://www.sciencedirect.com/science/article/pii/S1361920925001683"
  },
  {
    id: 2,
    title: "A global feasibility gap in resilient island energy transitions",
    authors: <><strong>Churui Huang</strong>, Haoran Zhang<sup>*</sup>, Jinyue Yan</>,
    venue: "Nature Communications",
    year: "Under Review",
    abstract: "Island nations are central to achieving UN Sustainable Development Goal 7 on affordable and clean energy, yet the economic feasibility of their energy transitions has not been systematically quantified at the global scale. Using a high-resolution framework covering more than 1,800 inhabited islands and 50 million hourly records of demand and renewable potential, we assess the costs of resilient low-carbon systems. We find that over 50% of islands face unaffordable transition costs under current income levels, with burdens most acute in Southeast Asia, coastal Africa, and the Western Pacific. Incorporating climate-resilience design further worsens outcomes, reclassifying 7% of islands into higher-cost categories. Although continued technological progress is projected to reduce the global average Levelized Cost of Energy (LCOE) by about 4% by 2050, such a modest decline remains insufficient to bridge the feasibility gap for low-income islands, leaving substantial disparities in progress toward the energy equity objectives of SDG7. Our results highlight that market-driven cost declines alone cannot deliver affordable island transitions, calling for targeted international finance to bridge persistent feasibility gaps.",
    tags: ["Island energy transitions", "Economic feasibility", "Climate resilience"],
    link: "#"
  },
  {
    id: 3,
    title: "Climate Change Reshaping Global Energy Systems: A Review of Supply-Demand-Network Dynamics and Regional Resilience",
    authors: <><strong>Churui Huang</strong>, et al.</>,
    venue: "Nature Reviews",
    year: "Submitted",
    abstract: "A comprehensive review examining how climate change is reshaping global energy systems. We analyze the complex interactions between energy supply, demand, and network infrastructure, with emphasis on regional resilience strategies in the face of environmental disruptions.",
    tags: ["Climate Change", "Energy Systems", "Resilience"],
    link: "#"
  },
  {
    id: 4,
    title: "Power generation potential evaluation on electric vehicle integrated photovoltaic: A case study of Shanghai's taxi fleet",
    authors: <><strong>Churui Huang</strong>, et al.</>,
    venue: "Applied Energy",
    year: "Submitted",
    abstract: "This case study evaluates the potential of integrating photovoltaic systems with electric vehicle fleets, focusing on Shanghai's taxi network. We assess the technical feasibility, economic viability, and environmental benefits of solar-powered EV infrastructure in urban transportation systems.",
    tags: ["Electric Vehicles", "Photovoltaic", "Urban Energy"],
    link: "#"
  }
];

const Publications = () => {
  // Track which publications are expanded
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Character limit for collapsed abstract
  const CHAR_LIMIT = 250;

  // Toggle expand/collapse for a publication
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

  // Get truncated or full abstract
  const getDisplayAbstract = (pub) => {
    const isExpanded = expandedIds.has(pub.id);
    if (isExpanded || pub.abstract.length <= CHAR_LIMIT) {
      return pub.abstract;
    }
    return pub.abstract.substring(0, CHAR_LIMIT) + '...';
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Selected Publications</h1>

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
                <p className="pub-authors">{pub.authors}</p>
                <p className="pub-abstract">
                  {getDisplayAbstract(pub)}
                  {needsToggle && (
                    <button
                      className="abstract-toggle"
                      onClick={() => toggleExpand(pub.id)}
                    >
                      {isExpanded ? ' Show less' : ' Read more'}
                    </button>
                  )}
                </p>

                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">PDF &rarr;</a>
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