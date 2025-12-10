// src/pages/About.jsx
import { useContext } from 'react';
import { LanguageContext } from '../App';

const About = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      title: "About Me",
      intro: <>Hi, I'm <strong>Churui Huang</strong>, a postgraduate student at Peking University pursuing my Master's degree in Smart City and Big Data. I am passionate about leveraging data-driven approaches and advanced computational techniques to address the complex challenges facing modern urban systems.</>,
      paragraph1: "My research interests lie at the intersection of smart cities and big data, with a particular focus on convex optimization and reinforcement learning. I am fascinated by how these powerful mathematical and computational frameworks can be applied to optimize urban infrastructure, improve resource allocation, and enhance the overall quality of life in cities. From transportation networks to energy systems, I believe intelligent algorithms can unlock significant efficiency gains and sustainability benefits.",
      paragraph2: "Through my academic journey and research projects, I strive to develop practical solutions that can translate theoretical advances into real-world impact. Whether it's analyzing large-scale urban datasets, designing optimization algorithms for complex systems, or building decision-support tools for urban planners, I aim to contribute to building more intelligent, efficient, and livable cities for the future.",
      researchTitle: "Research Interests",
      researchInterests: [
        "Smart Cities",
        "Big Data Analytics",
        "Convex Optimization",
        "Reinforcement Learning",
        "Urban Computing",
        "Transportation Systems",
        "Energy Systems",
        "Data-Driven Decision Making"
      ],
      contactTitle: "Get in Touch",
      contactText: "Feel free to reach out for collaborations, research discussions, or just to say hi!",
      email: "Email",
      github: "GitHub"
    },
    zh: {
      title: "关于我",
      intro: <>你好，我是<strong>黄楚睿</strong>，北京大学智慧城市与大数据专业硕士研究生。我热衷于利用数据驱动的方法和先进的计算技术来应对现代城市系统面临的复杂挑战。</>,
      paragraph1: "我的研究兴趣在于智慧城市和大数据的交叉领域，特别关注凸优化和强化学习。我着迷于这些强大的数学和计算框架如何应用于优化城市基础设施、改善资源配置以及提高城市生活质量。从交通网络到能源系统，我相信智能算法可以释放显著的效率提升和可持续性效益。",
      paragraph2: "通过我的学术旅程和研究项目，我致力于开发能够将理论进展转化为实际影响的实用解决方案。无论是分析大规模城市数据集、为复杂系统设计优化算法，还是为城市规划者构建决策支持工具，我的目标都是为建设更智能、更高效、更宜居的未来城市做出贡献。",
      researchTitle: "研究兴趣",
      researchInterests: [
        "智慧城市",
        "大数据分析",
        "凸优化",
        "强化学习",
        "城市计算",
        "交通系统",
        "能源系统",
        "数据驱动决策"
      ],
      contactTitle: "联系我",
      contactText: "欢迎联系我进行合作、研究讨论或只是打个招呼！",
      email: "邮箱",
      github: "GitHub"
    }
  };

  const text = content[language];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{text.title}</h1>

        {/* Introduction Section */}
        <section className="about-section">
          <p className="about-intro">
            {text.intro}
          </p>

          <p className="about-text">
            {text.paragraph1}
          </p>

          <p className="about-text">
            {text.paragraph2}
          </p>
        </section>

        {/* Research Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">{text.researchTitle}</h2>
          <div className="skills-list">
            {text.researchInterests.map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="resume-section">
          <h2 className="section-title">{text.contactTitle}</h2>
          <div className="contact-info">
            <p className="about-text">
              {text.contactText}
            </p>
            <div className="contact-links">
              <a href="mailto:2501212708@stu.pku.edu.cn" className="contact-link">
                <span>{text.email}</span>
              </a>
              <a href="https://github.com/Alto-R" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>{text.github}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Fun Fact */}
        <section className="about-section" style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p className="about-text" style={{fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
            "Le vent se lève, il faut tenter de vivre"
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
