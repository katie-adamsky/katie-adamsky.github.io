import {Routes, Route, Link} from 'react-router-dom';
import ProjectPage from './ProjectPage';
import projects from './project_list';
import './projects.css';

function ProjectList({projects}) {
    return (
        <div className="project-feed">
            <ul>
                {Object.entries(projects).map((project) => (
                    <li key={project[0]} className="project-card">
                        <h3><Link to={`${project[0]}`}>{project[1].title}</Link></h3>
                        <p>{project[1].summary}</p>
                    </li>
                ))}
            </ul>
        </div>
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
