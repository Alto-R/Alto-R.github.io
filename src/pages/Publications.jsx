// src/pages/Publications.jsx
import React from 'react';

// 伪造的论文数据
const publications = [
  {
    id: 1,
    title: "Learning to See in the Dark: A Deep Learning Approach",
    authors: "Alto-R, A. Collaborator, B. Professor",
    venue: "CVPR 2025 (Oral)",
    year: "2025",
    abstract: "We propose a novel neural network architecture that enhances low-light images with unprecedented clarity and color accuracy.",
    tags: ["Computer Vision", "Deep Learning"],
    link: "#"
  },
  {
    id: 2,
    title: "Efficient Transformers for Mobile Devices",
    authors: "C. Colleague, Alto-R, D. Supervisor",
    venue: "ICLR 2024",
    year: "2024",
    abstract: "Optimizing attention mechanisms to reduce computational complexity by 40% without losing accuracy on standard benchmarks.",
    tags: ["NLP", "Optimization"],
    link: "#"
  },
  {
    id: 3,
    title: "Generative Adversarial Networks for Art Creation",
    authors: "Alto-R, E. Artist",
    venue: "SIGGRAPH 2023",
    year: "2023",
    abstract: "Exploring the intersection of creative coding and AI to generate high-resolution artistic textures.",
    tags: ["Generative AI", "Graphics"],
    link: "#"
  },
  {
    id: 4,
    title: "Robust Reinforcement Learning in Dynamic Environments",
    authors: "F. Student, Alto-R",
    venue: "NeurIPS 2023",
    year: "2023",
    abstract: "A new framework for agent adaptation in rapidly changing simulation environments.",
    tags: ["Reinforcement Learning", "Robotics"],
    link: "#"
  }
];

const Publications = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Selected Publications</h1>
        
        <div className="publications-grid">
          {publications.map((pub) => (
            <div key={pub.id} className="pub-card">
              <div className="pub-header">
                <span className="pub-year">{pub.year}</span>
                <span className="pub-venue">{pub.venue}</span>
              </div>
              <h2 className="pub-title">{pub.title}</h2>
              <p className="pub-authors">{pub.authors}</p>
              <p className="pub-abstract">{pub.abstract}</p>
              
              <div className="pub-footer">
                <div className="pub-tags">
                  {pub.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <a href={pub.link} className="pub-link">PDF &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;