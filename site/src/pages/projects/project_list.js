import Breath from './Breath';
import Faces from './Faces';

class Project {
    constructor(title, description, element) {
        this.title=title;
        this.description=description;
        this.element=element;
    }
}

const projects = {
    1: new Project('Breath of the Compassionate', 'A generative animated tessalation', <Breath />),
    2: new Project('Generative Faces', 'Randomly generated faces', <Faces />),
}

export {Project, projects};