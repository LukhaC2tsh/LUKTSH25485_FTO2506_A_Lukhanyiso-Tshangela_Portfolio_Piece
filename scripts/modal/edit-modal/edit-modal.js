function openModal(id){
    document.getElementById(id).showModal();
}

function closeModal(id){
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
   const buttons = [
    {id: "new-close-btn", modal:"new-task-modal"},
    {id: "close-modal-btn", modal:"task-modal"}
  ]

  buttons.forEach(({id, modal}) => {
    const btn = document.getElementById(id);
    if(btn){
      btn.addEventListener("click", () => closeModal(modal));
    }
  });

}

/**************************************DROPDOWN SCRIPT****************************************/
//function sets the style for the list items in the dropdown
function styleOptions(listItems) {
  listItems.forEach(li => {
    li.style.color = "var(--secondary-font-color)";
    li.style.fontWeight = "500";
  });
}

//function attaches the list item listeners
function attachOptionListeners(listItems, optionsContainer) {
  listItems.forEach(li => {
    li.addEventListener("click", function(event) {
      const newStatus = li.innerText.trim();
      document.getElementById("task-status").innerText = newStatus;
      optionsContainer.classList.remove("show-options");
    });
  });
}

//function sets the initial status of the task
function setInitialStatus(optionsTrigger, task) {
  optionsTrigger.querySelector("#task-status").innerText = task.status;
}

function setupToggle(optionsTrigger, optionsContainer) {
  if (optionsTrigger.dataset.toggleSetup === "true") return; // already set up

  optionsTrigger.addEventListener("click", function(event) {
    event.stopPropagation();
    optionsContainer.classList.toggle("show-options");
  });

  optionsTrigger.dataset.toggleSetup = "true"; // mark as initialized
}

//function closes list option block when clicks are outside optionsContainer and optionsTrigger
function setupOutsideClick(optionsTrigger, optionsContainer) {
  document.addEventListener("click", function(event) {
    if (!optionsContainer.contains(event.target) && !optionsTrigger.contains(event.target)) {
      optionsContainer.classList.remove("show-options");
    }
  });
}

//function initialises the dropdown
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



