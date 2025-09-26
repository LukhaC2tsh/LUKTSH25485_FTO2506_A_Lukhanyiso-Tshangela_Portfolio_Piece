import {renderTasks, createTaskCard} from "./render.js"

//function fetches tasks from the API
export async function fetchTasks() {
    try{
        const response = await fetch("https://jsl-kanban-api.vercel.app/");
        
        if(!response.ok){
            throw new Error("Resource not found")
        }
        
        const data = await response.json();
        saveTasks(data);
        return data

    } catch(error){
        console.error(error)
    }

}
//function loads tasks from local storage
export function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
//function saves tasks to local storage
export function saveTasks(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Initialize the board
export async function initBoard() {
    let tasks = loadTasks();

    // If no tasks in localStorage, fetch from API
    if (tasks.length === 0) {
        tasks = await fetchTasks();
    }

    // Render tasks
    renderTasks(tasks);

    console.log("Kanban board initialized with tasks:", tasks);
}

initBoard();
