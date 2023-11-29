import './about.css';
import {
    faGithubSquare,
    faLinkedin,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import options from './blog/options';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const About = () => {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        const contentful = require('contentful')
        const client = contentful.createClient({
          space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
          accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
        })
  
        client
        .getEntries({
          content_type: "componentAuthor",
          limit: 1,
          include: 10,
        })
        .then((entry) => setAuthor(entry.items))
        .catch(console.error);
    }, []);

    return (
        <div className="page">
        <div className="about">
            <div className="circle-container">
                <img className="katie" src={`${author?.[0].fields?.avatar?.fields?.file?.url}`} alt="katie-adamsky"/>
            </div>
            <div className="bio">
                {documentToReactComponents(author?.[0].fields?.bio, options)}
            </div>
        <div className="social-container">
            <h3>Find me in cyberspace </h3>
            <a href="https://www.github.com/katie-adamsky"
                className="social github">
                <FontAwesomeIcon icon={faGithubSquare} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/kathrynadamsky"
                className="social linkedin">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://www.instagram.com/adarnsky"
                className="social insta">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
        </div>
        </div>
    );
};
 
export default About;