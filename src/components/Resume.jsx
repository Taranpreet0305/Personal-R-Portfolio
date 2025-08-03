import { useState } from 'react';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section className="resume" id="resume">
      <div className="content animate__animated animate__fadeInUp">
        <div className="resume-container">
          <div className="resume-box">
            <h2>Why Hire Me?</h2>
            <button className={`resume-button ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
            <button className={`resume-button ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
          </div>

          <div className={`resume-detail education ${activeTab === 'education' ? 'active' : ''}`}>
            <h2 className="heading">My <span>Education</span></h2>
            <div className="resume-list">
              <div className="resume-item">
                <p className="year">2009–2023</p>
                <h3>10+2</h3>
                <p className="Source">Mata Gujri Public School (CBSE)</p>
              </div>
              <div className="resume-item">
                <p className="year">2023–2026</p>
                <h3>BCA</h3>
                <p className="Source">Don Bosco Institute Of Technology</p>
              </div>
            </div>
          </div>

          <div className={`resume-detail skills ${activeTab === 'skills' ? 'active' : ''}`}>
            <h2 className="heading">My <span>Skills</span></h2>
            <div className="resume-list">
              {["HTML", "CSS", "JavaScript", "PHP", "C/C++", "Java", "Python", "MySQL", "MS Office", "Canva", "Video Editing", "Photo Editing"].map(skill => (
                <div key={skill} className="resume-item">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;