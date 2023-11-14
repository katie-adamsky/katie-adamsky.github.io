import {useParams, Link} from 'react-router-dom';

function ProjectPage() {
  const {projectId} = useParams();
    return (
      <div>
        <h2>Project Page</h2>
        <p>Details for project with ID: {projectId}</p>
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  };
export default ProjectPage;