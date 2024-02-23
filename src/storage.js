import Project from './classes/Project.js';
import Todo from './classes/Todo.js';

const storage = (() => {

    let localStorage = window['localStorage'];

    const isAvailable = () => {
        try {
            const x = "__storage_test__";
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                (e.code === 22 ||
                e.code === 1014 ||
                e.name === "QuotaExceededError" ||
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                localStorage &&
                localStorage.length !== 0
            );
        }
    }

    const setItem = (name, object) => {
        localStorage.setItem(name, JSON.stringify(object));
    }

    const getItem = (name) => {
        return JSON.parse(localStorage.getItem(name));
    }

    const setProjectId = (id) => {
        setItem('projectId', id);
    }

    const getProjectId = () => {
        return getItem('projectId');
    }

    const setTodoId = (id) => {
        setItem('todoId', id);
    }

    const getTodoId = () => {
        return getItem('todoId');
    }

    const setCurrentProject = (currentProject) => {
        currentProject.todos = Array.from(currentProject.todos);
        setItem('currentProject', currentProject);
        currentProject.todos = new Map(currentProject.todos);
    }

    const getCurrentProject = () => {
        let currentProject = getItem('currentProject');
        currentProject = new Project('','',true).loadData(currentProject);
        convertObjectsToTodo(currentProject);
        return currentProject;
    }

    const convertObjectsToTodo = (project) => {
        project.todos.forEach((todo) =>  {
            todo = new Todo('','','','', true).loadData(todo);
        });
    }

    const setProjects = (projects) => {
        let arrayOfProjects = Array.from(projects);
        arrayOfProjects.forEach((project) => {
          project[1].todos = Array.from(project[1].todos);
        });
        arrayOfProjects = Array.from(arrayOfProjects);
        setItem('projects', arrayOfProjects);
        arrayOfProjects.forEach((project) => {
            project[1].todos = new Map(project[1].todos);
        })
    }

    const getProjects = () => {
        const projects = getItem('projects');
        projects.forEach((project) => {
            console.log(project);
            project[1] = new Project('','',true).loadData(project[1]);
            convertObjectsToTodo(project[1]);
            console.log(project[1]);
        })
        return new Map(projects);
    }

    return { isAvailable, setProjectId, getProjectId, setTodoId, getTodoId, setCurrentProject, getCurrentProject, setProjects, getProjects }
})();

export default storage;