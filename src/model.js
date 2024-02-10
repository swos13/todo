import Project from './classes/Project.js';
import Todo from './classes/Todo.js';

//currentproject
//add todo to project
//get all todos from project

const model = (() => {

    let currentProject;

    const createProject = (title, description) => {
        const project = new Project(title, description);
        return project;
    }
    const setCurrentProject = (project) => {
        currentProject = project;
    }
    const updateProject = (project, title, description) => {
        project.setProperties(title, description);
    }
    const createTodo = (title, description, priority, dueDate) => {
        const todo = new Todo(title, description, priority, dueDate);
        currentProject.addTodo(todo);
        return todo;
    }
    const updateTodo = (todo, title, description, priority, dueDate) => {
        todo.setProperties(title, description, priority, dueDate);
    }
    const deleteTodo = (todo) => {
        currentProject.removeTodo(todo);
    }
    
    return { createProject, setCurrentProject, updateProject, createTodo, updateTodo, deleteTodo }
})();

export default model;