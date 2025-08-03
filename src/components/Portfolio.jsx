import { useState } from 'react';
import projects from '../data/projects';

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section className="portfolio" id="portfolio">
            <div className="project-box">
                <h2 className="heading">My <span>Projects</span></h2>
                <div className="project-grid portfolio-container">
                    {projects.map((project, index) => (
                        <div className="portfolio-item" key={index} onClick={() => setSelectedProject(project)}>
                            <img src={project.image} alt={project.title} />
                            <h3>{project.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <div className="modal show" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setSelectedProject(null)}>&times;</span>
                        <h2 className="modal-title">{selectedProject.title}</h2>
                        <p className="modal-desc">{selectedProject.description}</p>
                        <div className="modal-links">
                            <a href={selectedProject.github} target="_blank" className="modal-git" rel="noreferrer">
                                <i className="bx bxl-github"></i> GitHub
                            </a>
                            <a href={selectedProject.live} target="_blank" className="modal-live" rel="noreferrer">
                                <i className="bx bx-link-external"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;