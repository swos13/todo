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
    const updateProject = (project, updatedProject) => {
        project.update(updatedProject);
    }
    const createTodo = (title, description, priority, dueDate) => {
        const todo = new Todo(title, description, priority, dueDate);
        currentProject.addTodoToProject(todo);
    }
    const updateTodo = (todo, updatedTodo) => {
        todo.update(updatedTodo);
    }
    const deleteTodoFromProject = (todo) => {
        currentProject.removeTodo(todo);
    }
})()