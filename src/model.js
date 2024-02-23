import Project from './classes/Project.js';
import Todo from './classes/Todo.js';

const model = (() => {

    let currentProject;
    let projects;

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
    const setProjects = (allProjects) => {
        projects = allProjects;
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
    const getProjectId = () => {
        return Project.ids;
    }
    const setProjectId = (id) => {
        Project.ids = id;
    }
    const getTodoId = () => {
        return Todo.ids;
    }
    const setTodoId = (id) => {
        Todo.ids = id;
    }
    
    return { createProject, updateProject, deleteProject, setProjects, getProjects, getCurrentProject, setCurrentProject, createTodo, updateTodo, deleteTodo, 
            getProjectId, setProjectId, getTodoId, setTodoId}
})();

export default model;