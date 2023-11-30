import {Routes, Route, Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import ProjectPage from './ProjectPage';
import projects from './project_list';
import './projects.css';

const query = `
query {
    projectThumbnailsCollection {
      items{
        projectName
        thumbnail {
          url
        }
      }
    }
    }
`;

function ProjectList({projects}) {
    const [thumbnails, setThumbnails] = useState(null);
  
    useEffect(() => {
      window
        .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
  
          setThumbnails(data?.projectThumbnailsCollection?.items);
        });
    }, []);
    if (!thumbnails) {
      return <div className="project-feed">"Loading..."</div>;
    }

    return (
        <div className="project-feed">
                {Object.entries(projects).map((project) => {
                  const img = thumbnails.find(item => item.projectName===project[1].title);
                  return (
                    <div key={project[0]} className="project-card">
                        <div className="circle-container">
                          <img src={`${img?.thumbnail?.url}`} alt={`${img?.projectName}`} className={`${project[1].color_scheme}`}/>
                        </div>
                        <h3><Link to={`${project[0]}`}>{project[1].title}</Link></h3>
                        <p>{project[1].summary}</p>
                    </div>
                );})}
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
