import {renderTasks, createTaskCard} from "./render.js"

//function fetches tasks from the API
export async function fetchTasks() {
    try{
        const response = await fetch("https://jsl-kanban-api.vercel.app/");
        
        if(!response.ok){
            throw new Error("Resource not found")
        }
        
        const data = await response.json();

        localStorage.setItem("tasks", JSON.stringify(data));
    } catch(error){
        console.error(error)
    }

}

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

const tasks = loadTasks();
console.log("Loaded tasks from localStorage:", tasks);

