export default class Project {   

    static ids = 1; 

    constructor (title, description, load = false){
        if(!load){
            this.id = Project.ids++;
            this.setProperties(title, description);
            this.todos = new Map();
        }
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

    loadData({id, title, description, todos}){
        this.setProperties(title, description);
        this.todos = new Map(todos);
        this.id = id;
        return this;
    }
}