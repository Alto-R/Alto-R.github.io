// src/pages/Publications.jsx
import { useState, useContext } from 'react';
import { LanguageContext } from '../App';

const Publications = () => {
  const { language } = useContext(LanguageContext);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const CHAR_LIMIT = 250;

  const publicationsData = {
    en: {
      title: "Selected Publications",
      readMore: " Read more",
      showLess: " Show less",
      pdfLink: "PDF →",
      publications: [
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
          title: "Power generation potential evaluation on electric vehicle integrated photovoltaic: A case study of Shanghai's taxi fleet",
          authors: <><strong>Churui Huang</strong>, et al.</>,
          venue: "Applied Energy",
          year: "Submitted",
          abstract: "This case study evaluates the potential of integrating photovoltaic systems with electric vehicle fleets, focusing on Shanghai's taxi network. We assess the technical feasibility, economic viability, and environmental benefits of solar-powered EV infrastructure in urban transportation systems.",
          tags: ["Electric Vehicles", "Photovoltaic", "Urban Energy"],
          link: "#"
        },
        {
          id: 4,
          title: "Climate Change Reshaping Global Energy Systems: A Review of Supply-Demand-Network Dynamics and Regional Resilience",
          authors: <><strong>Churui Huang</strong>, et al.</>,
          venue: "Nature Reviews",
          year: "Working",
          abstract: "A comprehensive review examining how climate change is reshaping global energy systems. We analyze the complex interactions between energy supply, demand, and network infrastructure, with emphasis on regional resilience strategies in the face of environmental disruptions.",
          tags: ["Climate Change", "Energy Systems", "Resilience"],
          link: "#"
        }
      ]
    },
    zh: {
      title: "精选论文",
      readMore: " 展开",
      showLess: " 收起",
      pdfLink: "PDF →",
      publications: [
        {
          id: 1,
          title: "高速公路通行费折扣政策和网络扩张对碳排放的影响",
          authors: <>Han Yang<sup>†</sup>, <strong>黄楚睿</strong><sup>†</sup>, Qing Yu<sup>*</sup>, 等</>,
          venue: "Transportation Research Part D",
          year: "已发表",
          abstract: "高速公路在交通相关的二氧化碳排放中占有重要份额，但减少这些排放的政策干预仍未得到充分探索。本文利用长期电子不停车收费（ETC）数据，研究了通行费折扣政策和网络扩张对高速公路碳排放的影响。我们提出了一个自下而上的框架来估算高速公路排放量，并使用时间序列分解和因果推断方法相结合来分离政策影响。研究结果表明，通行费折扣对高速公路碳排放产生了显著的正向影响，货运交通向高速公路的转移降低了整个系统范围的排放：平均而言，在交通网络中，每公里的折扣高速公路行驶每天可净减少52克二氧化碳。这些发现强调了政策驱动的高速公路利用降低总碳足迹的潜力，以及精心校准政策以管理诱发性客运出行的重要性。",
          tags: ["交通运输", "碳排放", "政策分析"],
          link: "https://www.sciencedirect.com/science/article/pii/S1361920925001683"
        },
        {
          id: 2,
          title: "全球岛屿能源转型韧性的可行性差距",
          authors: <><strong>黄楚睿</strong>, Haoran Zhang<sup>*</sup>, Jinyue Yan</>,
          venue: "Nature Communications",
          year: "审稿中",
          abstract: "岛国对于实现联合国可持续发展目标7（负担得起的清洁能源）至关重要，但其能源转型的经济可行性尚未在全球范围内得到系统量化。利用覆盖1800多个有人居住岛屿和5000万小时需求与可再生能源潜力记录的高分辨率框架，我们评估了具有韧性的低碳系统的成本。研究发现，在当前收入水平下，超过50%的岛屿面临无法承受的转型成本，东南亚、非洲沿海和西太平洋地区的负担最为严重。纳入气候韧性设计进一步恶化了结果，将7%的岛屿重新分类到更高成本类别。尽管持续的技术进步预计到2050年将全球平均平准化能源成本（LCOE）降低约4%，但这种温和的下降仍不足以弥合低收入岛屿的可行性差距，在实现SDG7能源公平目标方面留下了巨大差距。我们的结果表明，仅靠市场驱动的成本下降无法实现负担得起的岛屿能源转型，需要有针对性的国际融资来弥合持续存在的可行性差距。",
          tags: ["岛屿能源转型", "经济可行性", "气候韧性"],
          link: "#"
        },
        {
          id: 3,
          title: "电动汽车集成光伏发电潜力评估：以上海出租车队为例",
          authors: <><strong>黄楚睿</strong>, 等</>,
          venue: "Applied Energy",
          year: "已提交",
          abstract: "本案例研究评估了光伏系统与电动汽车车队集成的潜力，重点关注上海的出租车网络。我们评估了城市交通系统中太阳能驱动电动汽车基础设施的技术可行性、经济可行性和环境效益。",
          tags: ["电动汽车", "光伏发电", "城市能源"],
          link: "#"
        },
        {
          id: 4,
          title: "气候变化重塑全球能源系统：供需网络动态与区域韧性综述",
          authors: <><strong>黄楚睿</strong>, 等</>,
          venue: "Nature Reviews",
          year: "进行中",
          abstract: "一项全面的综述，探讨气候变化如何重塑全球能源系统。我们分析了能源供应、需求和网络基础设施之间的复杂相互作用，重点关注面对环境破坏的区域韧性策略。",
          tags: ["气候变化", "能源系统", "韧性"],
          link: "#"
        }
      ]
    }
  };

  const data = publicationsData[language];

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

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{data.title}</h1>

        <div className="publications-grid">
          {data.publications.map((pub) => {
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
                      {isExpanded ? data.showLess : data.readMore}
                    </button>
                  )}
                </p>

                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">{data.pdfLink}</a>
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
