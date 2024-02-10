import model from "./model.js";

const project = model.createProject("my project", "this is my project that I have to complete");
model.setCurrentProject(project);
const todo = model.createTodo(project, "moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
console.log(todo);