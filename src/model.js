import Project from './classes/Project.js';
import Todo from './classes/Todo.js';

const model = (() => {

    let currentProject = new Project("My Project","Description of My Project");
    const projects = new Map();

    const createProject = (title, description) => {
        const project = new Project(title, description);
        projects.set(project.id, project);
        return project;
    }
    const updateProject = (project, title, description) => {
        project.setProperties(title, description);
    }
    const deleteProject = (projectId) => {
        projects.delete(projectId);
    }
    const getProjects = () => {
        return projects;
    }
    const getCurrentProject = () => {
        return currentProject;
    }
    const setCurrentProject = (projectId) => {
        currentProject = projects.get(projectId);
    }
    const createTodo = (title, description, priority, dueDate) => {
        const todo = new Todo(title, description, priority, dueDate);
        currentProject.addTodo(todo);
        return todo;
    }
    const updateTodo = (todo, title, description, priority, dueDate) => {
        todo.setProperties(title, description, priority, dueDate);
    }
    const deleteTodo = (todoId) => {
        currentProject.removeTodo(todoId);
    }
    
    return { createProject, updateProject, deleteProject, getProjects, getCurrentProject, setCurrentProject, createTodo, updateTodo, deleteTodo }
})();

export default model;