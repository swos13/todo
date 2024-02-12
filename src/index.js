import model from "./model.js";

const project = model.createProject("my project", "this is my project that I have to complete");
model.setCurrentProject(project.id);
const todo = model.createTodo("moje todo do zrobienia", "to jest moje todo, ktore musze kiedys zrobic", "low", "2019-03-22");
console.log(todo);