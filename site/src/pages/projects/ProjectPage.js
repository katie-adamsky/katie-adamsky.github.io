import {useParams, Link} from 'react-router-dom';
import {projects} from './project_list';

function ProjectPage() {
  const {projectId} = useParams();
  const project = projects[projectId];
    return (
      <div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {project.element}
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  };
export default ProjectPage;