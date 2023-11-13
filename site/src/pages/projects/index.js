import {Routes, Route, Link, Outlet} from 'react-router-dom';
import ProjectPage from './ProjectPage';

const projects = [
    { id: 1, title: 'Project 1', description: 'Description for Project 1' },
    { id: 2, title: 'Project 2', description: 'Description for Project 2' },
    { id: 3, title: 'Project 3', description: 'Description for Project 3' },
    // Add more projects as needed
  ];

  const ProjectCard = ({project}) => {
    return (
      <div className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Link to={project.id}>Learn more</Link>
      </div>
    );
  };

const ProjectList = () => {
    return (
    <div>
        {projects.map((project) => (
        <ProjectCard project={project}/>
        ))}
    </div>
    );
}

const Projects = () => {
    return (
        <div className="project-feed">
            <h2>
                Projects
            </h2>
            <Routes>
                <Route index element={<ProjectList />} />
                <Route path="/:projectId" element={<ProjectPage />} />
            </Routes>
            <Outlet />
        </div>
    );
};
 
export default Projects;
