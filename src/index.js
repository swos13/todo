import model from "./model.js";
import view from "./view.js";
import storage from "./storage.js";
import './style.css';

const controller = (() => {
    
    const start = () => {
        setEventFunctions();
        const project = getCurrentProject();
        view.setUp(model.getProjects(), project);
        setProject(project.id);
    }

    const saveData = () => {
        storage.setProjects(model.getProjects());
        storage.setCurrentProject(model.getCurrentProject());
    }

    const getCurrentProject = () => {
        let project;
        if(storage.isAvailable()){
            let response = storage.getProjectId();
            if(!response){
            }
            else{
               model.setProjectId(response);
            }
            response = storage.getTodoId();
            if(!response){
            }
            else{
                model.setTodoId(response);
            }
            response = storage.getProjects();
            if(!response){
                model.setProjects(new Map());
            }
            else{
                model.setProjects(response);
            }
            response = storage.getCurrentProject();
            if(!response)
                project = createDefaultProject();
            else{
                project = response;
            }
            model.setCurrentProject(project.id);
        }
        else{
            model.setProjects(new Map());
            project = createDefaultProject();
            model.setCurrentProject(project.id);
            model.createTodo("My Todo","This is my todo I have to complete for this project", "high", "2024-06-30");
            saveData();
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
        eventFunctions.set('delete-project', deleteProject);
        eventFunctions.set('set-project', setProject);
        eventFunctions.set('show-todos', showTodos);
        eventFunctions.set('check-project-title', checkProjectTitle);
        view.setEventFunctions(eventFunctions);
    }

    const createDefaultProject = () => {
        const project = model.createProject("my project", "this is my project that I have to complete");
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
        saveData();
        storage.setTodoId(model.getTodoId());
    }

    const editTodo = (form) => {
        view.updateTodo(form.id, form.title.value, form.description.value, form.priority.value, form.date.value);
        model.updateTodo(model.getCurrentProject().todos.get(parseInt(form.id)), form.title.value, form.description.value, form.priority.value, form.date.value);
        saveData();
    }

    const deleteTodo = (todo) => {
        model.deleteTodo(todo.id);
        view.deleteTodoCard(todo.id);
        saveData();
    }

    const createProject = (form) => {
        const newProject = model.createProject(form.title.value, form.description.value);
        storage.setProjects(model.getProjects());
        view.addProjectToContainer(newProject, view.getProjectsContainer());
        storage.setProjectId(model.getProjectId());
    }

    const editProject = (form) => {
        view.updateProject(form.title.value, form.description.value);
        model.updateProject(model.getCurrentProject(), form.title.value, form.description.value);
        saveData();
    }

    const deleteProject = (project) => {
        model.deleteProject(project.id);
        view.deleteProject(project.title);
        const newCurrentProjectId = Math.min(...Array.from(model.getProjects()).map((project) => project[0]));
        setProject(newCurrentProjectId);
        saveData();
    }

    const setProject = (projectId) => {
        model.setCurrentProject(projectId);
        const newCurrentProject = model.getProjects().get(projectId);
        view.changeContent(view.createProject(newCurrentProject));
        storage.setCurrentProject(newCurrentProject);
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

    const checkProjectTitle = (title) => {
        return Array.from(model.getProjects()).map((project) => project[1].title).includes(title);
    }

    return { start }
})();

controller.start();

export default controller;