export default class Project {   

    static ids = 1; 

    constructor (title, description){
        this.setProperties(title, description);
        this.todos = new Map();
        this.id = Project.ids++;
    }

    setProperties(title, description){
        this.title = title;
        this.description = description;
    }

    addTodo(todo){
        this.todos.set(todo.id, todo);
    }

    removeTodo(id){
        this.todos.delete(id);
    }
}