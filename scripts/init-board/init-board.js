import { initSideBar } from "../ui-and-theme/side-bar.js";
import { initNewTaskModal } from "../modal/new-modal/new-modal.js";
import { closeButton } from "../modal/edit-modal/edit-modal.js";
import { loadTasks } from "../utils/local-storage.js";
import { renderTasks } from "../rendering/render.js";
/**
 * Initializes the Kanban board application.
 *
 * This function performs the following steps:
 * 1. Loads tasks from local storage using `loadTasks()`.
 * 2. If no tasks are found, it fetches tasks from the API using `fetchTasks()`.
 * 3. Initializes the sidebar functionality with `initSideBar()`.
 * 4. Renders the tasks into their respective columns using `renderTasks()`.
 * 5. Sets up modal close buttons using `closeButton()`.
 * 6. Initializes the new task modal functionality with `initNewTaskModal()`.
 * 7. Logs the loaded or fetched tasks to the console for debugging.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves once the board and all features are initialized.
 */
async function initBoard() {
    let tasks = loadTasks();

    // If no tasks in localStorage, fetch from API
    if (tasks.length === 0) {
        tasks = await fetchTasks();
    }

    // Render tasks
    initSideBar();
    renderTasks(tasks);
    closeButton();
    initNewTaskModal();
    console.log("Kanban board initialized with tasks:", tasks);
}

initBoard();