const view = (() => {

    const body = document.querySelector('body');
    let eventFunctions = new Map();
    let todosCardsContainer;

    const setUp = (projects, project) => {
        appendChildren(body, [createSidebar(projects), createProject(project)]);
    }

    const changeContent = (newContent) => {
        body.removeChild(document.querySelector('.project-container'));
        body.appendChild(newContent);
    }

    const getProjectsContainer = () => document.querySelector('.sidebar-projects-container');

    const addProjectToContainer = (project, container) => {
        const projectName = document.createElement('a');
        projectName.classList.add('project-link');
        projectName.classList.add(project.title.replace(' ', '-'));
        projectName.textContent = project.title;
        projectName.addEventListener('click', () => {
            eventFunctions.get('set-project')(project.id);
        })
        container.appendChild(projectName);
    }

    const createSidebar = (projects) => {
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');

        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = "Add project";
        addProjectButton.addEventListener('click', displayAddProjectDialog);

        const yourProjectsText = document.createElement('div');
        yourProjectsText.classList.add('your-projects');
        yourProjectsText.textContent = "Your projects";

        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('sidebar-projects-container');

        projects.forEach(project => addProjectToContainer(project, projectsContainer));

        appendChildren(sidebar, [addProjectButton, yourProjectsText, projectsContainer]);
        return sidebar;
    }

    const getTitleError = () => {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = "Title is required and must be unique!";
        errorMessage.classList.add('error');
        errorMessage.style.visibility = 'hidden';
        return errorMessage;
    }

    const confirmDialog = (event, titleValue, dialog, errorMessage, functionName, form) => {
        event.preventDefault();
            if(titleValue == '' || eventFunctions.get('check-project-title')(titleValue)){
                errorMessage.style.visibility = 'visible';
            }
            else{
                eventFunctions.get(functionName)(form);
                dialog.close();
            }
    }

    const setEventFunctions = (functions) => {
        eventFunctions = functions;
    } 

    const getInput = (type) => {
        const input = document.createElement('input');
        input.type = type;
        return input;
    }

    const getTextArea = () => {
        const textarea = document.createElement('textarea');
        textarea.rows = "5";
        return textarea;
    }

    const createInput = (id, type, name, placeholder, labelText) => {
        const label = document.createElement('label');
        label.for = id;
        label.textContent = labelText;
        const input = name == 'description' ? getTextArea() : getInput(type);
        input.id = id;
        if (type == 'text') input.value = '';
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

    const createProjectDialog = (functionName) => {
        const [dialog, form, buttons] = createDialogWithForm(functionName);
        const [,titleInput, titleRow] = createInput('project-title', 'text', 'title', 'Title', 'Title');
        const [,, descriptionRow] = createInput('project-description', 'text', 'description', 'Description', 'Description');
        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });
        
        appendChildren(form, [titleRow, errorMessage, descriptionRow, buttons]);
        return [dialog, form, buttons, errorMessage];
    }

    const deleteProject = (projectTitle) => {
        const projectOnSidebar = document.querySelector(`.${projectTitle.replace(' ', '-')}`);
        projectOnSidebar.parentNode.removeChild(projectOnSidebar);
    }

    const createTodoDialog = (functionName) => {
        const [dialog, form, buttons] = createDialogWithForm(functionName);
        const [, titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        const [,, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        const [,, dateRow] = createInput('todo-due-date', 'date', 'date', '01/01/2030', 'Due date');
        const priorityText = document.createElement('div');
        priorityText.textContent = 'Priority:';
        priorityText.classList.add('dialog-row');
        const [, lowPriorityInput, lowPriorityRow] = createInput('todo-low-priority', 'radio', 'priority', '', 'Low');
        const [, mediumPriorityInput, mediumPriorityRow] = createInput('todo-medium-priority', 'radio', 'priority', '', 'Medium');
        const [, highPriorityInput, highPriorityRow] = createInput('todo-high-priority', 'radio', 'priority', '', 'High');

        lowPriorityInput.value = 'low';
        mediumPriorityInput.value = 'medium';
        highPriorityInput.value = 'high';

        lowPriorityInput.checked = true;

        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('priority-container');

        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });

        appendChildren(priorityContainer, [priorityText, lowPriorityRow, mediumPriorityRow, highPriorityRow]);
        appendChildren(form, [titleRow, errorMessage, descriptionRow, dateRow, priorityContainer, buttons]);


        return [dialog, form, buttons, errorMessage];
    }

    const createAddDialogElements = (dialog, form, buttons, errorMessage, functionName) => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.classList.add('add-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');

        addButton.addEventListener('click', (event) => {
            confirmDialog(event, form.title.value, dialog, errorMessage, functionName, form);
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        appendChildren(buttons, [addButton, cancelButton]);

        dialog.appendChild(form);
        body.appendChild(dialog);
        dialog.showModal();
    }

    const displayAddTodoDialog = () => {
        const [dialog, form, buttons, errorMessage] = createTodoDialog('Add Todo');
        createAddDialogElements(dialog, form, buttons, errorMessage, 'add-todo');
    }

    const createConfirmDeleteDialog = (editDialog, objectString, object) => {
        const confirmText = document.createElement('p');
        confirmText.textContent = `Are you sure you want to delete this ${objectString}?`;
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.classList.add('yes-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');

        const buttons = document.createElement('div');
        buttons.classList.add('confirm-buttons');
        appendChildren(buttons, [yesButton, cancelButton]);

        yesButton.addEventListener('click', () => {
            eventFunctions.get(`delete-${objectString}`)(object);
            dialog.close();
            if(editDialog != null)
                editDialog.close();
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        const dialog = document.createElement('dialog');
        dialog.classList.add(`delete-dialog`);
        dialog.addEventListener('close', () => {
            body.removeChild(dialog);
        });

        appendChildren(dialog, [confirmText, buttons]);

        body.appendChild(dialog);
        dialog.showModal();
    }

    const displayEditTodoDialog = (todo) => {
        const [dialog, form, buttons, errorMessage] = createTodoDialog('Edit Todo');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        form.title.value = todo.title;
        form.description.value = todo.description;
        form.priority.value = todo.priority;
        form.date.value = todo.dueDate;
        form.id = todo.id;

        saveButton.addEventListener('click', (event) => {
            confirmDialog(event, form.title.value , dialog, errorMessage, 'edit-todo', form);
            
        });

        cancelButton.addEventListener('click', () => {
            dialog.close();
        });

        deleteButton.addEventListener('click', () => {
            createConfirmDeleteDialog(dialog, 'todo', todo);
        })

        appendChildren(buttons, [saveButton, deleteButton, cancelButton]);

        dialog.appendChild(form);
        body.appendChild(dialog);
        dialog.showModal();
    }

    const displayAddProjectDialog = () => {
        const [dialog, form, buttons, errorMessage] = createProjectDialog('Add Project');
        createAddDialogElements(dialog, form, buttons, errorMessage, 'add-project');
    }

    const displayEditProjectDialog = (title, description) => {
        const [dialog, form, buttons, errorMessage] = createProjectDialog('Edit Project');

        form.title.value = title;
        form.description.value = description;

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

    const createProjectHeader = (project) => {
        const header = document.createElement('div');
        header.classList.add('project-header');

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-name');
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement('div');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = project.description;

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

        deleteProjectButton.addEventListener('click', () => {
            createConfirmDeleteDialog(null, 'project', project);
        })

        appendChildren(projectButtons, [addTodoButton, editProjectButton, deleteProjectButton]);
        appendChildren(header, [projectTitle, projectDescription, projectButtons]);

        return header;
    }

    const createTodosContainer = () => {
        const todos = document.createElement('div');
        todos.classList.add('todos-container');

        const buttons = document.createElement('div');
        buttons.classList.add('todos-selection');

        const inProgressButton = document.createElement('button');
        inProgressButton.classList.add('in-progress-button');
        inProgressButton.classList.add('active');
        inProgressButton.textContent = 'In progress';

        inProgressButton.addEventListener('click', () => {
            clearTodosContainer();
            inProgressButton.classList.add('active');
            completedButton.classList.remove('active');
            allButton.classList.remove('active');
            todosCardsContainer.setAttribute('class', 'todos-cards in-progress');
            eventFunctions.get('show-todos')('in-progress');
        });

        const completedButton = document.createElement('button');
        completedButton.classList.add('completed-button');
        completedButton.textContent = 'Completed';

        completedButton.addEventListener('click', () => {
            clearTodosContainer();
            inProgressButton.classList.remove('active');
            completedButton.classList.add('active');
            allButton.classList.remove('active');
            todosCardsContainer.setAttribute('class', 'todos-cards completed');
            eventFunctions.get('show-todos')('completed');
        });

        const allButton = document.createElement('button');
        allButton.classList.add('all-button');
        allButton.textContent = 'All';

        allButton.addEventListener('click', () => {
            clearTodosContainer();
            inProgressButton.classList.remove('active');
            completedButton.classList.remove('active');
            allButton.classList.add('active');
            todosCardsContainer.setAttribute('class', 'todos-cards all');
            eventFunctions.get('show-todos')('all');
        });

        appendChildren(buttons, [inProgressButton, completedButton, allButton])

        todosCardsContainer = document.createElement('div');
        todosCardsContainer.setAttribute('class', 'todos-cards in-progress');

        appendChildren(todos, [buttons, todosCardsContainer]);

        return todos;
    }

    const createProject = (project) => {
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('project-container');
        const gradient = document.createElement('div');
        gradient.classList.add('gradient');
        appendChildren(contentContainer, [createProjectHeader(project), gradient, createTodosContainer()]);
        return contentContainer;
    }

    const updateProject = (title, description) => {
        document.querySelector('.project-name').textContent = title;
        document.querySelector('.project-description').textContent = description;
    }

    const getTodosContainer = () => todosCardsContainer;

    const createTodoCard = (todo) => {
        const card = document.createElement('div');
        card.classList.add('todo-card');
        card.classList.add('rolled');
        card.id = todo.id;
        
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('card-title');
        titleContainer.textContent = todo.title;

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('card-description');

        if(todo.description.trim() != ''){
            descriptionContainer.textContent = todo.description;
        }

        const priorityContainer = document.createElement('div');
        priorityContainer.setAttribute('class', `card-priority ${todo.priority}`);
        priorityContainer.textContent = `Priority: ${todo.priority}`;

        const dueDateContainer = document.createElement('div');
        dueDateContainer.classList.add('card-due-date');

        if(todo.dueDate.trim() != ''){
            dueDateContainer.textContent = `Due: ${todo.dueDate}`;
        }

        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.isCompleted == true ? "Completed!" : "Complete";
        const buttonClass = todo.isCompleted == true ? "completed" : "incomplete";
        completeButton.setAttribute('class', buttonClass);
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";

        completeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if(todo.isCompleted == false){
                completeButton.textContent = 'Completed!';
                completeButton.setAttribute('class', 'completed');
            }
            else{
                completeButton.textContent = 'Complete';
                completeButton.setAttribute('class', 'incomplete');
            }
            if(!todosCardsContainer.classList.contains('all'))
                todosCardsContainer.removeChild(card);
            eventFunctions.get('change-todo-completion')(todo.id);
        })

        editButton.addEventListener('click', (event) => {
            displayEditTodoDialog(todo);
            event.stopPropagation();
        });

        appendChildren(buttons, [completeButton, editButton]);
        appendChildren(card, [titleContainer, descriptionContainer, priorityContainer, dueDateContainer, buttons]);

        card.addEventListener('click', () => {
            if(card.classList.contains('rolled')){
                card.classList.remove('rolled');
                card.classList.add('unrolled');
            }
            else if(card.classList.contains('unrolled')){
                card.classList.remove('unrolled');
                card.classList.add('rolled');
            }
        });

        return card;
    }

    const updateTodo = (id, title, description, priority, dueDate) => {
        document.querySelector(`.todo-card[id="${id}"] > .card-title`).textContent = title;
        document.querySelector(`.todo-card[id="${id}"] > .card-description`).textContent = description;
        const priorityContainer = document.querySelector(`.todo-card[id="${id}"] > .card-priority`);
        priorityContainer.textContent = `Priority: ${priority}`;
        priorityContainer.setAttribute('class', `card-priority ${priority}`);
        const dueDateText = document.querySelector(`.todo-card[id="${id}"] > .card-due-date`);
        dueDateText.textContent = dueDate != '' ? `Due: ${dueDate}` : '';
    }

    const deleteTodoCard = (id) => {
        const todoCard = document.querySelector(`.todo-card[id="${id}"]`);
        todoCard.parentNode.removeChild(todoCard);
    }

    const addTodoToContainer = (todoCard, container) => {
        container.appendChild(todoCard);
    }

    const clearTodosContainer = () => {
        while(todosCardsContainer.lastChild)
            todosCardsContainer.removeChild(todosCardsContainer.lastChild);
    }

    return { setUp, createSidebar, getProjectsContainer, addProjectToContainer, changeContent,
            setEventFunctions, createProject, updateProject, deleteProject,
            getTodosContainer, createTodoCard, 
            updateTodo, deleteTodoCard, addTodoToContainer }
})();

export default view;