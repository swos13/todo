import Project from './classes/Project.js';
import Todo from './classes/Todo.js';

//currentproject
//add todo to project
//get al ltodos from project

const model = (() => {

    let currentProject;

    const createProject = (title, description) => {
        const project = new Project(title, description);
        return project;
    }
    const setCurrentProject = (project) => {
        currentProject = project;
    }
    const updateProject = (project, updatedProject) => {
        project.update(updatedProject);
    }
})()