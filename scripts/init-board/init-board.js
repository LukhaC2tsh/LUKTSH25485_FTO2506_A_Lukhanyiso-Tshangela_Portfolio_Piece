import {renderTasks} from "../rendering/render.js"
import {closeButton} from "../modal/edit-modal/edit-modal.js"
import { initNewTaskModal} from "../modal/new-modal/new-modal.js"
import {loadTasks, fetchTasks} from "../utils/local-storage.js"
console.log("initNewTaskModal imported")


////////////////////////////////////////////////Initialize the board\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function initBoard() {
    let tasks = loadTasks();

    // If no tasks in localStorage, fetch from API
    if (tasks.length === 0) {
        tasks = await fetchTasks();
    }

    // Render tasks
    renderTasks(tasks);
    closeButton();
    initNewTaskModal();
    console.log("Kanban board initialized with tasks:", tasks);
}

initBoard();