import model from "./model.js";
import view from "./view.js";
import './style.css';

const controller = (() => {
    const start = () => {
        const project = createDefaultProject();
        view.setUp(model.getProjects(), project.title, project.description);
        setEventFunctions();
        const todo = model.createTodo("moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
        const todoCard = view.createTodoCard(todo);
        view.addTodoToContainer(todoCard, view.getIncompletedTodosContainer());
    }
    const setEventFunctions = () => {
        const eventFunctions = new Map();
        eventFunctions.set('add-todo', createTodo);
        eventFunctions.set('edit-todo', editTodo);
        eventFunctions.set('change-todo-completion', changeTodoCompletion);
        eventFunctions.set('add-project', createProject);
        eventFunctions.set('edit-project', editProject);
        eventFunctions.set('set-project', setProject);
        view.setEventFunctions(eventFunctions);
    }
    const createDefaultProject = () => {
        const project = model.createProject("my project", "this is my project that I have to complete");
        model.setCurrentProject(project.id);
        return project;
    }
    const addTodoToView = (todo) => {
        const card = view.createTodoCard(todo);
        const container = todo.isCompleted == false ? view.getIncompletedTodosContainer() : view.getCompletedTodosContainer();
        view.addTodoToContainer(card, container);
    }
    const createTodo = (form) => {
        const todo = model.createTodo(form.title.value, form.description.value, form.priority.value, form.date.value);
        addTodoToView(todo);
    }
    const editTodo = (form) => {
        view.updateTodo(form.id, form.title.value, form.description.value, form.priority.value, form.date.value);
        model.updateTodo(model.getCurrentProject().todos.get(parseInt(form.id)), form.title.value, form.description.value, form.priority.value, form.date.value);
        console.log(model.getCurrentProject().todos.get(parseInt(form.id)));
    }
    const createProject = (form) => {
        const newProject = model.createProject(form.title.value, form.description.value);
        view.addProjectToContainer(newProject, view.getProjectsContainer());
    }
    const editProject = (form) => {
        view.updateProject(form.title.value, form.description.value);
        model.updateProject(model.getCurrentProject(), form.title.value, form.description.value);
    }
    const setProject = (projectId) => {
        model.setCurrentProject(projectId);
        const newCurrentProject = model.getProjects().get(projectId);
        view.changeContent(view.createProject(newCurrentProject.title, newCurrentProject.description));
        const sortedTodos = Array.from(newCurrentProject.todos, ([, todo]) => (todo)).sort((todoA, todoB) => {
            return new Date(todoA.dueDate) - new Date(todoB.dueDate);
        });
        console.log(sortedTodos);
        sortedTodos.forEach((todo) => {
            addTodoToView(todo);
        })
    }
    const changeTodoCompletion = (id) => {
        const todo = model.getCurrentProject().todos.get(id) ;
        todo.isCompleted = todo.isCompleted == false ? true : false;
    }
    return { start }
})();

controller.start();

export default controller;