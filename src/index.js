import model from "./model.js";
import view from "./view.js";
import './style.css';

const project = model.createProject("my project", "this is my project that I have to complete");
model.setCurrentProject(project.id);
const todo = model.createTodo("moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
console.log(todo);

view.setUp(project.title, project.description);
const todoCard = view.createTodoCard(todo.id, "moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22", false);
console.log();
view.addTodoToContainer(todoCard, view.getIncompletedTodosContainer());