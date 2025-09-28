import { renderTasks } from "../../rendering/render.js";
import { loadTasks, saveTasks } from "../../utils/local-storage.js";
import { closeModal, openModal, setupOutsideClick, setupToggle, styleOptions } from "../edit-modal/edit-modal.js";



/**
 * Initializes the "New Task" modal.
 * Sets up event listeners on the "Add Task" buttons to open the modal
 * and initialize inputs and dropdowns.
 */
export function initNewTaskModal(){
    console.log("initNewTaskModal running");
    const newTaskBtns = [
        document.getElementById('add-task-btn'),
        document.getElementById('add-task-btn-2'),
    ];

    newTaskBtns.forEach(btn => {
        if(btn){
            btn.addEventListener("click", function(event){
                const modal = document.getElementById('new-task-modal');
                // Initialize the modal inputs
                modal.querySelector('#new-task-title').value = "";
                modal.querySelector('#new-task-desc').value = "";
                modal.querySelector('#new-task-status').innerText = "todo";

                setupNewDropdown(modal);
                openModal("new-task-modal");
                createNewTask();
            });
        }
    });
}

/**
 * Sets up the "Create Task" button functionality.
 * Creates a new task from modal inputs, saves it to localStorage, and re-renders tasks.
 * @private
 */
function createNewTask(){
    const tasks = loadTasks();
    const createTaskBtn = document.getElementById('create-task-btn');

    if(createTaskBtn){
        createTaskBtn.addEventListener("click", () => {
            const task = {
                id: crypto.randomUUID(),
                title: "",
                description: "",
                status: "",
            };
            
            const newTaskTitle = document.getElementById('new-task-title').value.trim();
            const newTaskDesc = document.getElementById('new-task-desc').value.trim();
            const newTaskStatus = document.getElementById('new-task-status').innerText.trim();

            task.title = newTaskTitle;
            task.description = newTaskDesc;
            task.status = newTaskStatus;

            tasks.push(task);
            saveTasks(tasks);
            renderTasks(tasks);
            closeModal("new-task-modal");
        });
    }
}

/**
 * Sets up the dropdown for the new task modal.
 * Styles the list items, attaches listeners, and initializes toggle and outside-click handling.
 * @param {HTMLElement} modal - The modal element containing the dropdown.
 * @private
 */
function setupNewDropdown(modal) {
    const optionsContainer = modal.querySelector("#new-status-option-container");
    const optionsTrigger = modal.querySelector("#new-task-status-event");
    const listItemTrigger = optionsContainer.querySelectorAll("li");

    styleOptions(listItemTrigger);
    attachNewOptionListeners(listItemTrigger, optionsContainer, modal);

    if (!optionsTrigger.dataset.toggleSetup) {
        setupToggle(optionsTrigger, optionsContainer);
        optionsTrigger.dataset.toggleSetup = "true";
    }

    if (!optionsContainer.dataset.outsideClickSetup) {
        setupOutsideClick(optionsTrigger, optionsContainer);
        optionsContainer.dataset.outsideClickSetup = "true";
    }
}

/**
 * Attaches click listeners to each dropdown option in the new task modal.
 * Updates the displayed status when a list item is clicked.
 * @param {NodeListOf<HTMLElement>} listItemTrigger - List of `<li>` elements in the dropdown.
 * @param {HTMLElement} optionsContainer - Container element for dropdown items.
 * @param {HTMLElement} modal - The modal element containing the dropdown.
 * @private
 */
function attachNewOptionListeners(listItemTrigger, optionsContainer, modal){
    const statusSpan = modal.querySelector('#new-task-status');
    listItemTrigger.forEach(li => {
        if(li.dataset.listenerSetup) return;

        li.addEventListener("click", () => {
            statusSpan.innerText = li.innerText.trim();
            optionsContainer.classList.remove("show-options");
        });

        li.dataset.listenerSetup = "true";
    });
}
