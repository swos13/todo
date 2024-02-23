export default class Todo {

    static ids = 1;

    constructor(title, description = '', priority, dueDate, load = false){
        if(!load){
            this.setProperties(title, description, priority, dueDate);
            this.isCompleted = false;
            this.id = Todo.ids++;
        }
    }

    setProperties(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    changeCompletion() {
        if(this.isCompleted == false)
            this.isCompleted = true;
        else
            this.isCompleted = false;
        return this.isCompleted;
    }

    loadData({title, description, priority, dueDate, isCompleted, id}){
        this.setProperties(title, description, priority, dueDate);
        this.isCompleted = isCompleted;
        this.id = id;
        return this;
    }
}