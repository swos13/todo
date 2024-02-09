export default class Project {   

    static ids = 1; 

    constructor (title, description){
        this.title = title;
        this.description = description;
        this.todos = new Map();
        this.id = Project.ids++;
    }

    addTodo = (todo) => {
        this.todos.set(todo.id, todo);
    }

    removeTodo = (id) => {
        this.todos.delete(id);
    }
}