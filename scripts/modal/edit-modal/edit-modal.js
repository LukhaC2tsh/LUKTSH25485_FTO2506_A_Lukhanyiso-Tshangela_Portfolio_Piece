import { renderTasks } from "../../rendering/render.js";
import { saveTasks, loadTasks, fetchTasks } from "../../utils/local-storage.js";

/**
 * Opens a modal dialog by its element ID.
 * @param {string} id - The ID of the modal element to open.
 */
export function openModal(id){
    document.getElementById(id).showModal();
}

/**
 * Closes a modal dialog by its element ID.
 * @param {string} id - The ID of the modal element to close.
 */
export function closeModal(id){
    document.getElementById(id).close();
}

/**
 * Initializes the task modal with a given task object.
 * Fills in task fields, sets up dropdown, and attaches edit/delete functionality.
 * @param {Object} task - The task object to initialize the modal with.
 * @param {string} task.id - Unique identifier for the task.
 * @param {string} task.title - Title of the task.
 * @param {string} task.description - Description of the task.
 * @param {string} task.status - Current status of the task.
 */
export function initializeModal(task){
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-status").innerText = task.status;

    setupDropdown(task);
    openModal("task-modal");
    editTask(task);
    deleteTask(task);
}

/**
 * Attaches functionality to delete a task when delete button is clicked.
 * @param {Object} currentTask - The task object to delete.
 * @private
 */
function deleteTask(currentTask){
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === currentTask.id);
    const deleteBtn = document.getElementById('delete-task-btn');
  
    if(deleteBtn){
        deleteBtn.addEventListener("click", () => {
            if(taskIndex !== -1){
                tasks.splice(taskIndex, 1);
                saveTasks(tasks);
                renderTasks(tasks);
                closeModal('task-modal');
            }
        });
    }
}

/**
 * Attaches functionality to edit/save a task when save button is clicked.
 * @param {Object} currentTask - The task object to edit.
 * @private
 */
function editTask(currentTask){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id === currentTask.id);
    const saveBtn = document.getElementById('save-task-btn');

    saveBtn.addEventListener("click", () => {
        if(taskIndex !== -1){
            const updatedTitle = document.querySelector('#task-title').value;
            const updatedDesc = document.querySelector('#task-desc').value;
            const updatedStatus = document.querySelector('#task-status').innerText;
            
            tasks[taskIndex].title = updatedTitle;
            tasks[taskIndex].description = updatedDesc;
            tasks[taskIndex].status = updatedStatus;

            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(tasks);
            closeModal("task-modal");
        }
    });
}

/**
 * Sets up event listeners for modal close buttons.
 */
export function closeButton(){
    const newCloseBtn = document.getElementById('new-close-modal-btn');
    const closeModalBtn = document.getElementById("close-modal-btn");

    if(newCloseBtn) newCloseBtn.addEventListener("click", () => closeModal("new-task-modal"));
    if(closeModalBtn) closeModalBtn.addEventListener("click", () => closeModal("task-modal"))
}

/**
 * Styles dropdown list items.
 * @param {NodeListOf<HTMLElement>} listItems - List of `<li>` elements to style.
 */
export function styleOptions(listItems) {
    listItems.forEach(li => {
        li.style.color = "var(--secondary-font-color)";
        li.style.fontWeight = "500";
    });
}

/**
 * Attaches click listeners to each dropdown list item.
 * @param {NodeListOf<HTMLElement>} listItems - List of `<li>` elements.
 * @param {HTMLElement} optionsContainer - Container element for dropdown items.
 * @private
 */
function attachOptionListeners(listItems, optionsContainer) {
    listItems.forEach(li => {
        li.addEventListener("click", function(event) {
            const newStatus = li.innerText.trim();
            document.getElementById("task-status").innerText = newStatus;
            optionsContainer.classList.remove("show-options");
        });
    });
}

/**
 * Sets the initial status of the task in the dropdown.
 * @param {HTMLElement} optionsTrigger - The element triggering the dropdown.
 * @param {Object} task - Task object with status property.
 */
export function setInitialStatus(optionsTrigger, task) {
    optionsTrigger.querySelector("#task-status").innerText = task.status;
}

/**
 * Sets up the dropdown toggle functionality.
 * @param {HTMLElement} optionsTrigger - Element that toggles the dropdown.
 * @param {HTMLElement} optionsContainer - Dropdown container element.
 */
export function setupToggle(optionsTrigger, optionsContainer) {
    if (optionsTrigger.dataset.toggleSetup === "true") return; 

    optionsTrigger.addEventListener("click", function(event) {
        event.stopPropagation();
        optionsContainer.classList.toggle("show-options");
    });

    optionsTrigger.dataset.toggleSetup = "true"; 
}

/**
 * Closes the dropdown when clicks occur outside of the container.
 * @param {HTMLElement} optionsTrigger - Dropdown trigger element.
 * @param {HTMLElement} optionsContainer - Dropdown container element.
 */
export function setupOutsideClick(optionsTrigger, optionsContainer) {
    if (optionsContainer.dataset.outsideClickSetup === "true") return;

    const outsideClickListener = (event) => {
        if (!optionsContainer.contains(event.target) && !optionsTrigger.contains(event.target)) {
            optionsContainer.classList.remove("show-options");
        }
    };

    document.addEventListener("click", outsideClickListener);
    optionsContainer.dataset.outsideClickSetup = "true";
}

/**
 * Initializes dropdown functionality for a task.
 * @param {Object} task - Task object for dropdown setup.
 * @private
 */
function setupDropdown(task) {
    const optionsContainer = document.getElementById("status-option-container");
    const optionsTrigger = document.getElementById("task-status-event");
    const listItemTrigger = optionsContainer.querySelectorAll(".status-options li");

    styleOptions(listItemTrigger);
    attachOptionListeners(listItemTrigger, optionsContainer);
    setInitialStatus(optionsTrigger, task);
    setupToggle(optionsTrigger, optionsContainer);
    setupOutsideClick(optionsTrigger, optionsContainer);
}
