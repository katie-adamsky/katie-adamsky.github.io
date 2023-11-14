import {Routes, Route, Link} from 'react-router-dom';
import ProjectPage from './ProjectPage';
import {projects} from './project_list';

function ProjectList({projects}) {
    return (
        <>
            <h2>
                Projects
            </h2>
            <ul>
                {Object.entries(projects).map((project) => (
                    <li key={project[0]} className="project-card">
                        <h3><Link to={`${project[0]}`}>{project[1].title}</Link></h3>
                        <p>{project[1].description}</p>
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
