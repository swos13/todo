export default class Todo {

    static ids = 1;

    constructor(title, description, priority, dueDate){
        this.setProperties(title, description, priority, dueDate);
        this.id = Todo.ids++;
    }

    setProperties(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}