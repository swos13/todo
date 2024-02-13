const view = (() => {

    const body = document.querySelector('body');
    const sidebar = document.createElement('div');

    const setUp = (name, description) => {
        sidebar.classList.add('sidebar');

        body.appendChild(sidebar);
        body.appendChild(createProject(name, description));
    }

    const createInput = (id, type, name, placeholder, labelText) => {
        const label = document.createElement('label');
        label.for = id;
        label.textContent = labelText;
        const input = document.createElement('input');
        input.id = id;
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;

        const inputRow = document.createElement('div');
        appendChildren(inputRow, [label, input]);
        return [label, input, inputRow];
    }

    const appendChildren = (parent, children) => {
        children.forEach(child => parent.appendChild(child));
    }

    const createDialogWithForm = (name) => {
        const className = name.toLowerCase().replace(' ', '-');
        const dialog = document.createElement('dialog');
        dialog.classList.add(`${className}-dialog`);
        dialog.addEventListener('close', () => {
            body.removeChild(dialog);
        });

        const dialogName = document.createElement('div');
        dialogName.textContent = name;
        dialogName.classList.add('dialog-name');
        const form = document.createElement('form');
        form.classList.add(`${className}-form`);
        form.method = 'dialog';
        dialog.append(dialogName);
        return [dialog, form];
    }

    const displayAddTodoDialog = () => {
        const [dialog, form] = createDialogWithForm('Add Todo');
        const [,, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        const [,, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        const [,, dateRow] = createInput('todo-due-date', 'date', 'due-date', '01/01/2030', 'Due date');
        const priorityText = document.createElement('p');
        priorityText.textContent = 'Priority:';
        const [, lowPriorityInput, lowPriorityRow] = createInput('todo-low-priority', 'radio', 'priority', '', 'Low');
        const [, mediumPriorityInput, mediumPriorityRow] = createInput('todo-medium-priority', 'radio', 'priority', '', 'Medium');
        const [, highPriorityInput, highPriorityRow] = createInput('todo-high-priority', 'radio', 'priority', '', 'High');

        lowPriorityInput.value = 'low';
        mediumPriorityInput.value = 'medium';
        highPriorityInput.value = 'high';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';

        addButton.addEventListener('click', () => {
            dialog.close();
            //submit form
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        appendChildren(form, [titleRow, descriptionRow, dateRow, priorityText, 
                       lowPriorityRow, mediumPriorityRow, highPriorityRow, addButton, cancelButton]);

        dialog.appendChild(form);
        body.appendChild(dialog);
        dialog.showModal();
    }

    const displayEditProjectDialog = (title, description) => {
        const [dialog, form] = createDialogWithForm('Edit Project');
        const [,titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        titleInput.value = title;
        const [,descriptionInput, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        descriptionInput.value = description;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';

        saveButton.addEventListener('click', () => {
            dialog.close();
            //submit form
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        appendChildren(form, [titleRow, descriptionRow, saveButton, cancelButton]);

        dialog.appendChild(form);
        body.appendChild(dialog);
        dialog.showModal();
    }

    const createProjectHeader = (title, description) => {
        const header = document.createElement('div');
        header.classList.add('project-header');

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-name');
        projectTitle.textContent = title;

        const projectDescription = document.createElement('div');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = description;

        const projectButtons = document.createElement('div');
        projectButtons.classList.add('project-buttons-container');

        const addTodoButton = document.createElement('button');
        addTodoButton.classList.add('add-button');
        addTodoButton.textContent = "Add todo";
        addTodoButton.addEventListener('click', displayAddTodoDialog);

        const editProjectButton = document.createElement('button');
        editProjectButton.classList.add('edit-project-button');
        editProjectButton.textContent = "Edit";
        editProjectButton.addEventListener('click', () => {
            displayEditProjectDialog(title, description);
        });

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        deleteProjectButton.textContent = "Delete";

        projectButtons.appendChild(addTodoButton);
        projectButtons.appendChild(editProjectButton);
        projectButtons.appendChild(deleteProjectButton);

        header.appendChild(projectTitle);
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