/**
 * Fetches tasks from the remote API and saves them to localStorage.
 * @async
 * @function
 * @returns {Promise<Array<Object>|undefined>} Returns an array of task objects if successful, otherwise undefined.
 * Each task object has the following structure:
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Title of the task.
 * @property {string} description - Description of the task.
 * @property {string} status - Status of the task ("todo", "doing", "done").
 */
export async function fetchTasks() {
    try {
        const response = await fetch("https://jsl-kanban-api.vercel.app/");

        if(!response.ok){
            throw new Error("Resource not found");
        }

        const data = await response.json();
        saveTasks(data);
        return data;

    } catch(error){
        console.error(error);
    }
}

/**
 * Loads tasks from localStorage.
 * @function
 * @returns {Array<Object>} Array of task objects stored in localStorage.
 * Returns an empty array if no tasks are found.
 */
export function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

/**
 * Saves an array of tasks to localStorage.
 * @function
 * @param {Array<Object>} tasks - Array of task objects to save.
 * Each task object should have the following properties:
 * @param {string} tasks[].id - Unique identifier for the task.
 * @param {string} tasks[].title - Title of the task.
 * @param {string} tasks[].description - Description of the task.
 * @param {string} tasks[].status - Status of the task ("todo", "doing", "done").
 */
export function saveTasks(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
