export function openModal(id){
    document.getElementById(id).showModal();
}

export function closeModal(id){
    document.getElementById(id).close();
}


export function initializeModal(task){
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-status").innerText = task.status;

    setupDropdown(task);
    openModal("task-modal");
}


export function closeButton(){
   const newCloseBtn = document.getElementById('new-close-modal-btn');
   const closeModalBtn = document.getElementById("close-modal-btn");

   if(newCloseBtn) newCloseBtn.addEventListener("click", () => closeModal("new-task-modal"));
   if(closeModalBtn) closeModalBtn.addEventListener("click", () => closeModal("task-modal"))

}

/**************************************DROPDOWN SCRIPT****************************************/
//function sets the style for the list items in the dropdown
export function styleOptions(listItems) {
  listItems.forEach(li => {
    li.style.color = "var(--secondary-font-color)";
    li.style.fontWeight = "500";
  });
}

///////////////////////////////////////////////////////function attaches the list item listeners
function attachOptionListeners(listItems, optionsContainer) {
  listItems.forEach(li => {
    li.addEventListener("click", function(event) {
      const newStatus = li.innerText.trim();
      document.getElementById("task-status").innerText = newStatus;
      optionsContainer.classList.remove("show-options");
    });
  });
}

////////////////////////////function sets the initial status of the task
export function setInitialStatus(optionsTrigger, task) {
  optionsTrigger.querySelector("#task-status").innerText = task.status;
}

////////////////////////////////////////////////////////////////////////////////////////////
export function setupToggle(optionsTrigger, optionsContainer) {
  if (optionsTrigger.dataset.toggleSetup === "true") return; // already set up

  optionsTrigger.addEventListener("click", function(event) {
    event.stopPropagation();
    optionsContainer.classList.toggle("show-options");
  });

  optionsTrigger.dataset.toggleSetup = "true"; // mark as initialized
}

//function closes list option block when clicks are outside optionsContainer and optionsTrigger
export function setupOutsideClick(optionsTrigger, optionsContainer) {
  if (optionsContainer.dataset.outsideClickSetup === "true") return;

  const outsideClickListener = (event) => {
    if (!optionsContainer.contains(event.target) && !optionsTrigger.contains(event.target)) {
      optionsContainer.classList.remove("show-options");
    }
  };

  /////////////////////////////////////////////////Add the listener to the document
  document.addEventListener("click", outsideClickListener);

  ///////////////////////////////////////////////////////Mark this container as having the listener set up
  optionsContainer.dataset.outsideClickSetup = "true";
}


////////////////////////////////////////////////////function initialises the dropdown
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



