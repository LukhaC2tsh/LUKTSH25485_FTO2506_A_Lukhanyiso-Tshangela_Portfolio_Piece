import {renderTasks} from "../rendering/render.js"
import {closeButton} from "../modal/edit-modal/edit-modal.js"
import { initNewTaskModal} from "../modal/new-modal/new-modal.js"
import {loadTasks, fetchTasks} from "../utils/local-storage.js"
import { initSideBar } from "../ui-and-theme/side-bar.js"
console.log("initNewTaskModal imported")

/**
 * Initializes the sidebar toggle functionality.
 *
 * This function sets up event listeners for two sidebar toggle buttons:
 * - `.sidebar-toggle`: toggles the visibility of the sidebar.
 * - `.sidebar-toggle-2`: shows the sidebar if hidden.
 *
 * It also manages the display of the secondary toggle button based on the
 * sidebar's visibility state.
 *
 * The function interacts with the following DOM elements:
 * @property {HTMLElement} sidebar - The main sidebar container with id `side-bar-div`.
 * @property {HTMLElement} sidebarToggle - The primary toggle button with class `sidebar-toggle`.
 * @property {HTMLElement} sidebarToggle2 - The secondary toggle button with class `sidebar-toggle-2`.
 *
 * @function
 * @returns {void} Does not return a value.
 */
export function initSideBar() {
    const sidebar = document.getElementById('side-bar-div');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarToggle2 = document.querySelector('.sidebar-toggle-2');

    if (!sidebar || !sidebarToggle || !sidebarToggle2) return;
    
    sidebarToggle2.style.display = "none";

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        sidebarToggle2.style.display = sidebar.classList.contains("hidden") ? "block" : "none";
    });
    
    sidebarToggle2.addEventListener("click", () => {
        sidebar.classList.remove('hidden');
        sidebarToggle2.style.display = "none";
    });
}
