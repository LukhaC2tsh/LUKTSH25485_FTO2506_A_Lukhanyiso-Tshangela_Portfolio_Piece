import { initializeModal } from "C:\Users\Lukhanyiso\Documents\GitHub\LUKTSH25485_FTO2506_A_Lukhanyiso-Tshangela_Portfolio_Piece\scripts\modal\edit-modal\edit-modal.js";

/**
 * Columns object mapping task statuses to their respective container elements.
 * Each container holds task cards for a specific status.
 * @type {Object.<string, HTMLElement|null>}
 */
const columns = {
    todo: document.querySelector(`.column-div[data-status="todo"] .tasks-container`),
    doing: document.querySelector(`.column-div[data-status="doing"] .tasks-container`),
    done: document.querySelector(`.column-div[data-status="done"] .tasks-container`)
};

/**
 * Creates a task card DOM element.
 * @param {Object} task - Task object containing id, title, and status.
 * @param {string} task.id - Unique identifier for the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.status - The status of the task ("todo", "doing", or "done").
 * @returns {HTMLDivElement} The created task card element.
 */
export function createTaskCard(task){
    const card = document.createElement('div');
    card.classList.add('task-div');
    card.innerHTML = `${task.title}`;
    card.id = task.id;

    card.addEventListener("click", function(){
        initializeModal(task);
    });

    return card;
}

/**
 * Renders tasks into their respective status columns.
 * Clears existing task cards before rendering.
 * Updates the task count in the column headers.
 * @param {Array<Object>} tasks - Array of task objects to render.
 * @param {string} tasks[].id - Unique identifier for the task.
 * @param {string} tasks[].title - Title of the task.
 * @param {string} tasks[].status - Status of the task ("todo", "doing", or "done").
 */
export function renderTasks(tasks){
    // Clear all columns first
    Object.values(columns).forEach(column => {
        if(column){
            column.innerHTML = "";
        }
    });

    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;

    // Append tasks to their respective columns
    tasks.forEach(task => {
        const column = columns[task.status.toLowerCase()];
        if(column){
            const card = createTaskCard(task);
            column.appendChild(card);

            if(task.status === "todo") todoCount += 1;
            if(task.status === "doing") doingCount += 1;
            if(task.status === "done") doneCount += 1;
        }
    });

    // Update column headers with task counts
    const todoHead = document.getElementById('toDoText');
    if(todoHead) todoHead.innerText = `TODO (${todoCount})`;
    
    const doingHead = document.getElementById('doingText');
    if(doingHead) doingHead.innerText = `DOING (${doingCount})`;
    
    const doneHead = document.getElementById('doneText');
    if(doneHead) doneHead.innerText = `DONE (${doneCount})`;
}
