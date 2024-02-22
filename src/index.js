import model from "./model.js";
import view from "./view.js";
import storage from "./storage.js";
import './style.css';

const controller = (() => {
    const start = () => {
        const project = getCurrentProject();
        view.setUp(model.getProjects(), project.title, project.description);
        setEventFunctions();
        const todo = model.createTodo("moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
        const todoCard = view.createTodoCard(todo);
        view.addTodoToContainer(todoCard, view.getTodosContainer());
    }
    const getCurrentProject = () => {
        let project;
        if(storage.isAvailable()){
            const response = storage.getFromStorage('currentProject');
            if(!response)
                project = createDefaultProject();
            else{
                project = response;
            }
        }
        else{
            project = createDefaultProject();
        }
        return project;
    }
    const setEventFunctions = () => {
        const eventFunctions = new Map();
        eventFunctions.set('add-todo', createTodo);
        eventFunctions.set('edit-todo', editTodo);
        eventFunctions.set('delete-todo', deleteTodo);
        eventFunctions.set('change-todo-completion', changeTodoCompletion);
        eventFunctions.set('add-project', createProject);
        eventFunctions.set('edit-project', editProject);
        eventFunctions.set('set-project', setProject);
        eventFunctions.set('show-todos', showTodos);
        view.setEventFunctions(eventFunctions);
    }
    const createDefaultProject = () => {
        const project = model.createProject("my project", "this is my project that I have to complete");
        model.setCurrentProject(project.id);
        return project;
    }
    const addTodoToView = (todo) => {
        const card = view.createTodoCard(todo);
        const container = view.getTodosContainer();
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
    const deleteTodo = (todo) => {
        model.deleteTodo(todo.id);
        view.deleteTodoCard(todo.id);
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
        storage.putInStorage('currentProject', newCurrentProject);
        showTodos('in-progress');
    }
    const showTodos = (type) => {
        let todosArray = [];
        model.getCurrentProject().todos.forEach((todo) => {
            if(type == 'all' || 
            (type == 'in-progress' && todo.isCompleted == false) || 
            (type == 'completed' && todo.isCompleted == true))
                todosArray.push(todo);
        })
        const sortedTodos = todosArray.sort((todoA, todoB) => {
            return new Date(todoA.dueDate) - new Date(todoB.dueDate);
        });
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