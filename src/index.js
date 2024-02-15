import model from "./model.js";
import view from "./view.js";
import './style.css';

const controller = (() => {
    const start = () => {
        const project = createDefaultProject();
        view.setUp(project.title, project.description);
        setEventFunctions();
        const todo = model.createTodo("moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
        const todoCard = view.createTodoCard(todo.id, todo.title, todo.description, todo.priority, todo.dueDate, false);
        view.addTodoToContainer(todoCard, view.getIncompletedTodosContainer());
    }
    const setEventFunctions = () => {
        const eventFunctions = new Map();
        eventFunctions.set('add-todo', createTodo);
        eventFunctions.set('edit-todo', editTodo);
        eventFunctions.set('add-project', createProject);
        eventFunctions.set('edit-project', editProject);
        view.setEventFunctions(eventFunctions);
    }
    const createDefaultProject = () => {
        const project = model.createProject("my project", "this is my project that I have to complete");
        model.setCurrentProject(project.id);
        return project;
    }
    const createTodo = (form) => {
        const todo = model.createTodo(form.title.value, form.description.value, form.priority.value, form.date.value);
        const card = view.createTodoCard(todo.id, todo.title, todo.description, todo.priority, todo.dueDate, todo.isCompleted);
        const container = todo.isCompleted == false ? view.getIncompletedTodosContainer() : view.getCompletedTodosContainer();
        view.addTodoToContainer(card, container);
    }
    const editTodo = () => {

    }
    const createProject = () => {

    }
    const editProject = (form) => {
        view.updateProject(form.title.value, form.description.value);
        model.updateProject(model.getCurrentProject(), form.title.value, form.description.value);
        console.log(model.getCurrentProject());
    }
    return { start }
})();

controller.start();

export default controller;