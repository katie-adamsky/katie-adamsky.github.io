import './about.css';
import {
    faGithubSquare,
    faLinkedin,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
    return (
        <div className="about">
            <h3>
                About Me
            </h3>
            <p>
                Hi! I'm Katie. I am a software developer looking for ways to explore my interests with code.
                I am passionate about urban planning and active transportation, studying psychology and theosophy,
                and automating the boring stuff.
                Right now, I am making generative art with a metaphysical flavor.
            </p>
            <p>
                When I'm not in front of the good screen, I am a volunteer librarian and a baritone singer in a barbershop chorus.
            </p>
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
    );
};
 
export default About;