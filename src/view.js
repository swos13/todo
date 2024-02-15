const view = (() => {

    const body = document.querySelector('body');
    const sidebar = document.createElement('div');
    let eventFunctions = new Map();

    const setUp = (name, description) => {
        sidebar.classList.add('sidebar');
        appendChildren(body, [sidebar, createProject(name, description)]);
    }

    const getTitleError = () => {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = "Title is required!";
        errorMessage.classList.add('error');
        errorMessage.style.visibility = 'hidden';
        return errorMessage;
    }

    const confirmDialog = (event, titleValue, dialog, errorMessage, functionName, form) => {
        event.preventDefault();
            if(titleValue == ''){
                errorMessage.style.visibility = 'visible';
            }
            else{
                dialog.close();
                eventFunctions.get(functionName)(form);
            }
    }

    const setEventFunctions = (functions) => {
        eventFunctions = functions;
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
        inputRow.classList.add('dialog-row');
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
        const buttons = document.createElement('div');
        buttons.classList.add('dialog-buttons');
        return [dialog, form, buttons];
    }

    const createProjectDialog = (functionName, title, description) => {
        const [dialog, form, buttons] = createDialogWithForm(functionName);
        const [,titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        titleInput.value = title;
        const [,descriptionInput, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        descriptionInput.value = description;

        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });
        
        appendChildren(form, [titleRow, errorMessage, descriptionRow, buttons]);
        return [dialog, form, buttons, errorMessage];
    }

    const createTodoDialog = (functionName, title, description, priority, dueDate) => {
        const [dialog, form, buttons] = createDialogWithForm(functionName);
        const [, titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        const [, descriptionInput, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        const [, dateInput, dateRow] = createInput('todo-due-date', 'date', 'date', '01/01/2030', 'Due date');
        const priorityText = document.createElement('div');
        priorityText.textContent = 'Priority:';
        priorityText.classList.add('dialog-row');
        const [, lowPriorityInput, lowPriorityRow] = createInput('todo-low-priority', 'radio', 'priority', '', 'Low');
        const [, mediumPriorityInput, mediumPriorityRow] = createInput('todo-medium-priority', 'radio', 'priority', '', 'Medium');
        const [, highPriorityInput, highPriorityRow] = createInput('todo-high-priority', 'radio', 'priority', '', 'High');

        lowPriorityInput.value = 'low';
        mediumPriorityInput.value = 'medium';
        highPriorityInput.value = 'high';

        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });

        appendChildren(form, [titleRow, errorMessage, descriptionRow, dateRow, priorityText, 
            lowPriorityRow, mediumPriorityRow, highPriorityRow, buttons]);

        titleInput.value = title;
        descriptionInput.value = description;
        dateInput.value = dueDate;
        form.priority.value = priority;


        return [dialog, form, buttons, errorMessage];
    }

    const displayAddTodoDialog = () => {
        const [dialog, form, buttons, errorMessage] = createTodoDialog('Add Todo', '', '', 'low', '');
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.classList.add('add-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');

        
        addButton.addEventListener('click', (event) => {
            confirmDialog(event, form.title.value, dialog, errorMessage, 'add-todo', form);
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        appendChildren(buttons, [addButton, cancelButton]);

        dialog.appendChild(form);
        body.appendChild(dialog);
        dialog.showModal();
    }

    const displayEditProjectDialog = (title, description) => {
        const [dialog, form, buttons, errorMessage] = createProjectDialog('Edit Project', title, description);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');

        saveButton.addEventListener('click', (event) => {
            confirmDialog(event, form.title.value , dialog, errorMessage, 'edit-project', form);
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        appendChildren(buttons, [saveButton, cancelButton]);

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
            displayEditProjectDialog(projectTitle.textContent, projectDescription.textContent);
        });

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        deleteProjectButton.textContent = "Delete";

        appendChildren(projectButtons, [addTodoButton, editProjectButton, deleteProjectButton]);
        appendChildren(header, [projectTitle, projectDescription, projectButtons]);

        return header;
    }

    const createTodosContainer = () => {
        const todos = document.createElement('div');
        todos.classList.add('todos-container');

        const incompletedTodos = document.createElement('div');
        incompletedTodos.classList.add('incompleted-todos');
        const completedTodos = document.createElement('div');
        completedTodos.classList.add('completed-todos');

        appendChildren(todos, [incompletedTodos, completedTodos]);

        return todos;
    }

    const createProject = (title, description) => {
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('project-container');
        appendChildren(contentContainer, [createProjectHeader(title, description), createTodosContainer()]);
        return contentContainer;
    }

    const updateProject = (title, description) => {
        document.querySelector('.project-name').textContent = title;
        document.querySelector('.project-description').textContent = description;
    }

    const getCompletedTodosContainer = () => document.querySelector('.completed-todos');
    const getIncompletedTodosContainer = () => document.querySelector('.incompleted-todos');

    const createTodoCard = (id, title, description, priority, dueDate, isCompleted) => {
        const card = document.createElement('div');
        card.classList.add('todo-card');
        card.id = id;
        
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('card-title');
        titleContainer.textContent = title;

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('card-description');

        if(description.trim() != ''){
            descriptionContainer.textContent = description;
        }

        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('card-priority');
        priorityContainer.textContent = `Priority: ${priority}`;

        const dueDateContainer = document.createElement('div');
        dueDateContainer.classList.add('card-due-date');

        if(dueDate.trim() != ''){
            dueDateContainer.textContent = `Due: ${dueDate}`;
        }

        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');

        const completeButton = document.createElement('button');
        completeButton.textContent = isCompleted == true ? "Completed!" : "Complete";
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";

        //TODO: add event listeners
        editButton.addEventListener('click', () => {
            displayEditTodoDialog(title, description, priority, dueDate);
        });

        appendChildren(buttons, [completeButton, editButton]);
        appendChildren(card, [titleContainer, descriptionContainer, priorityContainer, dueDateContainer, buttons]);

        return card;
    }

    const addTodoToContainer = (todoCard, container) => {
        container.appendChild(todoCard);
    }

    return { setUp, setEventFunctions, createProject, updateProject, getCompletedTodosContainer, getIncompletedTodosContainer, createTodoCard, addTodoToContainer }
})();

export default view;