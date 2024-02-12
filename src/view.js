//create elements (whole page for project and todos and sidebar with other projects)
//hold body and whole DOM structure???

const view = (() => {

    const body = document.querySelector('body');
    const sidebar = document.createElement('div');

    const setUp = (name, description) => {
        sidebar.classList.add('sidebar');

        body.appendChild(sidebar);
        body.appendChild(createProject(name, description));
    }

    const createProjectHeader = (name, description) => {
        const header = document.createElement('div');
        header.classList.add('project-header');

        const projectName = document.createElement('div');
        projectName.classList.add('project-name');
        projectName.textContent = name;

        const projectDescription = document.createElement('div');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = description;

        header.appendChild(projectName);
        header.appendChild(projectDescription);

        return header;
    }

    const createTodosContainer = () => {
        const todos = document.createElement('div');
        todos.classList.add('todos-container');

        const incompletedTodos = document.createElement('div');
        incompletedTodos.classList.add('incompleted-todos');

        const completedTodos = document.createElement('div');
        completedTodos.classList.add('completed-todos');

        todos.appendChild(incompletedTodos);
        todos.appendChild(completedTodos);

        return todos;
    }

    const createProject = (name, description) => {
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('project-container');
        contentContainer.appendChild(createProjectHeader(name, description));
        contentContainer.appendChild(createTodosContainer());

        return contentContainer;
    }

    return { setUp, createProject }
})();

export default view;