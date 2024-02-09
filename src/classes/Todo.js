export default class Todo {

    static ids = 1;

    constructor(title, description, priority, dueDate){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.id = Task.ids++;
    }

    update(todo) {
        this.title = todo.title;
        this.description = todo.description;
        this.priority = todo.priority;
        this.dueDate = todo.dueDate;
    }
}