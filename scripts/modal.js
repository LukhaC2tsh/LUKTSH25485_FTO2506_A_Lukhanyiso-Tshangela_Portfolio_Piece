function openModal(){
    document.getElementById('task-modal').showModal();
}

function closeModal(){
    document.getElementById('task-modal').close();
}


export function initializeModal(task){
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-status").innerContent = task.status;

    setupDropdown(task);
    openModal();
}


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
    li.addEventListener("click", function() {
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

//function shows list options box when optionsTrigger is clicked
function setupToggle(optionsTrigger, optionsContainer) {
  optionsTrigger.addEventListener("click", function(event) {
    event.stopPropagation();
    optionsContainer.classList.toggle("show-options");
  });
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
export function setupDropdown(task) {
  const optionsContainer = document.getElementById("status-option-container");
  const optionsTrigger = document.getElementById("task-status-event");
  const listItemTrigger = optionsContainer.querySelectorAll(".status-options li");

  styleOptions(listItemTrigger);
  attachOptionListeners(listItemTrigger, optionsContainer);
  setInitialStatus(optionsTrigger, task);
  setupToggle(optionsTrigger, optionsContainer);
  setupOutsideClick(optionsTrigger, optionsContainer);
}

