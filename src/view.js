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

        const projectButtons = document.createElement('div');
        projectButtons.classList.add('project-buttons-container');

        const addTodoButton = document.createElement('button');
        addTodoButton.classList.add('add-button');
        addTodoButton.textContent = "Add todo";

        const editProjectButton = document.createElement('button');
        editProjectButton.classList.add('edit-project-button');
        editProjectButton.textContent = "Edit";

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        deleteProjectButton.textContent = "Delete";

        projectButtons.appendChild(addTodoButton);
        projectButtons.appendChild(editProjectButton);
        projectButtons.appendChild(deleteProjectButton);

        header.appendChild(projectName);
        header.appendChild(projectDescription);
        header.appendChild(projectButtons);

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