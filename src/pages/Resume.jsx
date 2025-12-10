// src/pages/Resume.jsx
import { useContext } from 'react';
import { LanguageContext } from '../App';

const Resume = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      title: "Resume",
      education: {
        title: "Education",
        items: [
          {
            date: "2025.09 - Present",
            degree: "Master's in Smart City and Big Data",
            institution: "Peking University, College of Urban Planning and Design",
            description: "Focus on smart city planning and data-driven urban design."
          },
          {
            date: "2020.09 - 2025.07",
            degree: "B.S. in Urban and Rural Planning",
            institution: "Peking University, College of Urban and Environmental Sciences",
            description: "Comprehensive training in urban planning, design, and environmental studies."
          }
        ]
      },
      research: {
        title: "Research & Publications",
        items: [
          {
            date: "Published",
            title: "Carbon emission implications of toll discount policies and network expansions in highway",
            institution: "Transportation Research Part D (Co-First Author)",
            description: "Analyzed the impact of highway toll discount policies and network expansions on carbon emissions."
          },
          {
            date: "Under Review",
            title: "A global feasibility gap in resilient island energy transitions",
            institution: "Nature Communications",
            description: "Examined challenges in achieving resilient energy transitions for island systems globally."
          },
          {
            date: "Submitted",
            title: "Power generation potential evaluation on electric vehicle integrated photovoltaic: A case study of Shanghai's taxi fleet",
            institution: "Applied Energy",
            description: "Case study evaluating photovoltaic integration potential in Shanghai's taxi fleet."
          },
          {
            date: "Working",
            title: "Climate Change Reshaping Global Energy Systems: A Review of Supply-Demand-Network Dynamics and Regional Resilience",
            institution: "Nature Reviews",
            description: "Comprehensive review of supply-demand-network dynamics and regional resilience in energy systems."
          }
        ]
      },
      projects: {
        title: "Project Experience",
        items: [
          {
            date: "PKU Research",
            title: "Recreation Route Recommendation System Based on Social Media Data and User Needs",
            institution: "Peking University Research Training Program",
            description: "Independently developed a recreation route recommendation system based on social media data and user preferences."
          }
        ]
      },
      internship: {
        title: "Internship Experience",
        items: [
          {
            date: "2024.08 - 2024.11",
            title: "Backend Developer Intern",
            institution: "Urban Planning & Design Institute of Shenzhen (UPDIS)",
            description: "Responsible for backend development of Shenzhen's Mountain-Sea Connection Smart Navigation System."
          }
        ]
      },
      activities: {
        title: "Campus Activities",
        items: [
          {
            date: "2023.09 - 2024.09",
            title: "Peer Counselor",
            institution: "Peking University, College of Urban and Environmental Sciences",
            description: "Assisted with daily student management and provided support to fellow students."
          },
          {
            date: "2022.09 - 2023.09",
            title: "Director of Volunteer Service Department",
            institution: "Peking University, College of Urban and Environmental Sciences",
            description: "Led team training, managed reimbursements, and coordinated all volunteer service activities."
          }
        ]
      },
      skills: {
        title: "Professional Skills",
        items: ["Python", "JavaScript", "SPSS", "MATLAB", "AutoCAD", "SketchUp", "Photoshop", "Premiere", "Lightroom"]
      },
      languageSkills: {
        title: "Language Proficiency",
        items: ["English (CET-6: 563)"]
      },
      interests: {
        title: "Personal Interests",
        items: ["Photography", "Basketball", "Gaming"]
      }
    },
    zh: {
      title: "简历",
      education: {
        title: "教育背景",
        items: [
          {
            date: "2025.09 - 至今",
            degree: "智慧城市与大数据硕士",
            institution: "北京大学 城市规划与设计学院",
            description: "专注于智慧城市规划和数据驱动的城市设计。"
          },
          {
            date: "2020.09 - 2025.07",
            degree: "城乡规划学士",
            institution: "北京大学 城市与环境学院",
            description: "接受城市规划、设计和环境研究的全面培训。"
          }
        ]
      },
      research: {
        title: "科研与发表",
        items: [
          {
            date: "已发表",
            title: "高速公路通行费折扣政策和网络扩张对碳排放的影响",
            institution: "Transportation Research Part D（共同第一作者）",
            description: "分析了高速公路通行费折扣政策和网络扩张对碳排放的影响。"
          },
          {
            date: "审稿中",
            title: "全球岛屿能源转型韧性的可行性差距",
            institution: "Nature Communications",
            description: "研究了全球岛屿系统实现韧性能源转型面临的挑战。"
          },
          {
            date: "已提交",
            title: "电动汽车集成光伏发电潜力评估：以上海出租车队为例",
            institution: "Applied Energy",
            description: "评估上海出租车队光伏集成潜力的案例研究。"
          },
          {
            date: "进行中",
            title: "气候变化重塑全球能源系统：供需网络动态与区域韧性综述",
            institution: "Nature Reviews",
            description: "能源系统供需网络动态和区域韧性的综合综述。"
          }
        ]
      },
      projects: {
        title: "项目经历",
        items: [
          {
            date: "北大科研",
            title: "基于社交媒体数据与用户需求的游憩线路推荐系统构建",
            institution: "北京大学科研训练项目",
            description: "独立开发了基于社交媒体数据和用户偏好的游憩线路推荐系统。"
          }
        ]
      },
      internship: {
        title: "实习经历",
        items: [
          {
            date: "2024.08 - 2024.11",
            title: "后端开发实习生",
            institution: "深圳市城市规划设计研究院",
            description: "负责深圳山海连城智慧导航系统的后端开发。"
          }
        ]
      },
      activities: {
        title: "校园活动",
        items: [
          {
            date: "2023.09 - 2024.09",
            title: "朋辈辅导员",
            institution: "北京大学 城市与环境学院",
            description: "协助日常学生管理并为同学提供支持。"
          },
          {
            date: "2022.09 - 2023.09",
            title: "志愿服务部部长",
            institution: "北京大学 城市与环境学院",
            description: "负责团队培训、报销管理和协调所有志愿服务活动。"
          }
        ]
      },
      skills: {
        title: "专业技能",
        items: ["Python", "JavaScript", "SPSS", "MATLAB", "AutoCAD", "SketchUp", "Photoshop", "Premiere", "Lightroom"]
      },
      languageSkills: {
        title: "语言能力",
        items: ["英语（CET-6: 563）"]
      },
      interests: {
        title: "个人兴趣",
        items: ["摄影", "篮球", "游戏"]
      }
    }
  };

  const text = content[language];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">{text.title}</h1>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">{text.education.title}</h2>
          {text.education.items.map((item, index) => (
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
          <h2 className="section-title">{text.research.title}</h2>
          {text.research.items.map((item, index) => (
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
          <h2 className="section-title">{text.projects.title}</h2>
          {text.projects.items.map((item, index) => (
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
          <h2 className="section-title">{text.internship.title}</h2>
          {text.internship.items.map((item, index) => (
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
          <h2 className="section-title">{text.activities.title}</h2>
          {text.activities.items.map((item, index) => (
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
          <h2 className="section-title">{text.skills.title}</h2>
          <div className="skills-list">
            {text.skills.items.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Language Proficiency Section */}
        <section className="resume-section">
          <h2 className="section-title">{text.languageSkills.title}</h2>
          <div className="skills-list">
            {text.languageSkills.items.map((lang, index) => (
              <span key={index}>{lang}</span>
            ))}
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">{text.interests.title}</h2>
          <div className="skills-list">
            {text.interests.items.map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
