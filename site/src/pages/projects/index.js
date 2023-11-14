import {Routes, Route, Link, Outlet} from 'react-router-dom';
import ProjectPage from './ProjectPage';
const projects = [
    { id: 1, title: 'Project 1', description: 'Really cool stuff' },
    { id: 2, title: 'Project 2', description: 'Even cooler stuff' },
    { id: 3, title: 'Project 3', description: 'How does she do it!!' },
  ];

function ProjectList({projects}) {
    return (
        <>
            <h2>
                Projects
            </h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="project-card">
                        <h3><Link to={`${project.id}`}>{project.title}</Link></h3>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

const Projects = () => {
    return (
        <div className="project-feed">
            <Routes>
                <Route index element={<ProjectList projects={projects} />} />
                <Route path=":projectId" element={<ProjectPage />}/>
            </Routes>
        </div>
    );
};
 
export default Projects;
