const view = (() => {

    const body = document.querySelector('body');
    let eventFunctions = new Map();
    let todosCardsContainer;

    const setUp = (projects, name, description) => {
        appendChildren(body, [createSidebar(projects), createProject(name, description)]);
    }

    const changeContent = (newContent) => {
        body.removeChild(body.lastChild);
        body.appendChild(newContent);
    }

    const getProjectsContainer = () => document.querySelector('.sidebar-projects-container');

    const addProjectToContainer = (project, container) => {
        const projectName = document.createElement('a');
        projectName.classList.add('project-link');
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

        const allProjectsButton = document.createElement('button');
        allProjectsButton.classList.add('all-projects-button');
        allProjectsButton.textContent = "All projects";
        allProjectsButton.addEventListener('click', () => {
            displayAllProjects(projects);
        });

        const yourProjectsText = document.createElement('div');
        yourProjectsText.classList.add('your-projects');
        yourProjectsText.textContent = "Your projects";

        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('sidebar-projects-container');

        projects.forEach(project => addProjectToContainer(project, projectsContainer));

        appendChildren(sidebar, [addProjectButton, allProjectsButton, yourProjectsText, projectsContainer]);
        return sidebar;
    }

    const displayAllProjects = (projects) => {

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

    const getInput = (type) => {
        const input = document.createElement('input');
        input.type = type;
        return input;
    }

    const getTextArea = () => {
        return document.createElement('textarea');
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
        const [,titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        const [, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');

        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });
        
        appendChildren(form, [titleRow, errorMessage, descriptionRow, buttons]);
        return [dialog, form, buttons, errorMessage];
    }

    const createTodoDialog = (functionName) => {
        const [dialog, form, buttons] = createDialogWithForm(functionName);
        const [, titleInput, titleRow] = createInput('todo-title', 'text', 'title', 'Title', 'Title');
        const [,, descriptionRow] = createInput('todo-description', 'text', 'description', 'Description', 'Description');
        const [,, dateRow] = createInput('todo-due-date', 'date', 'date', '01/01/2030', 'Due date:');
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

        const errorMessage = getTitleError();

        titleInput.addEventListener('change', () => {
            errorMessage.style.visibility = 'hidden';
        });

        appendChildren(form, [titleRow, errorMessage, descriptionRow, dateRow, priorityText, 
            lowPriorityRow, mediumPriorityRow, highPriorityRow, buttons]);


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

    const displayEditTodoDialog = (todo) => {
        const [dialog, form, buttons, errorMessage] = createTodoDialog('Edit Todo');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');

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

        appendChildren(buttons, [saveButton, cancelButton]);

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

        const buttons = document.createElement('div');
        buttons.classList.add('todos-selection');

        const inProgressButton = document.createElement('button');
        inProgressButton.classList.add('in-progress-button');
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
        priorityContainer.classList.add('card-priority');
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
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";

        completeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            if(todo.isCompleted == false){
                completeButton.textContent = 'Completed!';
            }
            else{
                completeButton.textContent = 'Complete';
            }
            if(!todosCardsContainer.classList.contains('all'))
                todosCardsContainer.removeChild(card);
            eventFunctions.get('change-todo-completion')(todo.id);
        })

        editButton.addEventListener('click', () => {
            displayEditTodoDialog(todo);
        });

        appendChildren(buttons, [completeButton, editButton]);
        appendChildren(card, [titleContainer, descriptionContainer, priorityContainer, dueDateContainer, buttons]);

        card.addEventListener('click', () => {
            if(card.classList.contains('rolled')){
                card.classList.remove('rolled');
                card.classList.add('unrolled');
                card.insertBefore(descriptionContainer, priorityContainer);
                card.insertBefore(dueDateContainer, buttons);
            }
            else if(card.classList.contains('unrolled')){
                card.classList.remove('unrolled');
                card.classList.add('rolled');
                card.removeChild(descriptionContainer);
                card.removeChild(dueDateContainer);
            }
        });

        return card;
    }

    const updateTodo = (id, title, description, priority, dueDate) => {
        document.querySelector(`.todo-card[id="${id}"] > .card-title`).textContent = title;
        document.querySelector(`.todo-card[id="${id}"] > .card-description`).textContent = description;
        document.querySelector(`.todo-card[id="${id}"] > .card-priority`).textContent = `Priority: ${priority}`;
        const dueDateText = document.querySelector(`.todo-card[id="${id}"] > .card-due-date`);
        dueDateText.textContent = dueDate != '' ? `Due: ${dueDate}` : '';
    }

    const addTodoToContainer = (todoCard, container) => {
        container.appendChild(todoCard);
    }

    const clearTodosContainer = () => {
        while(todosCardsContainer.lastChild)
            todosCardsContainer.removeChild(todosCardsContainer.lastChild);
    }

    return { setUp, createSidebar, getProjectsContainer, addProjectToContainer, changeContent,
            setEventFunctions, createProject, updateProject,
            getTodosContainer, createTodoCard, 
            updateTodo, addTodoToContainer }
})();

export default view;