import {useParams} from 'react-router-dom';
import projects from './project_list';

function ProjectPage() {
  const {projectId} = useParams();
  const project = projects[projectId];
    return (
      <div className="project">
        <h1>{project.title}</h1>
        <h2>{project.summary}</h2>
        {project.description}
        {project.element}
        <p><i className="fab fa-github"></i><a className="code-link" href={project.source_code_url}>Project code</a></p>
      </div>
    );
  };
export default ProjectPage;