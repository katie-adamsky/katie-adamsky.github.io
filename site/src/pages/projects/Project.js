class Project {
    constructor(title, summary, description, element, source_code_url, color_scheme) {
        this.title=title;
        this.summary=summary;
        this.description=description;
        this.element=element;
        this.source_code_url = source_code_url;
        this.color_scheme = color_scheme ?? "purple";
    }
}
export default Project;