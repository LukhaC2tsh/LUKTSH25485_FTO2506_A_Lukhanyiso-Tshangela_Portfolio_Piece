export function initNewTaskModal(){
  const newTaskBtns = [
    document.getElementById('add-task-btn'),
    document.getElementById('add-task-btn-2'),
]

  newTaskBtns.forEach(btn => {
    
    if(btn){
      btn.addEventListener("click", function(event){
        document.getElementById('task-title').value = "";
        document.getElementById('task-desc').value = "";
        document.getElementById('task-status').innerText = "";
        setupNewDropdown();
        openModal("new-task-modal");
      })
    }
  });
}

//function initialises the dropdown
function setupNewDropdown() {
  const optionsContainer = document.getElementById("status-option-container");
  const optionsTrigger = document.getElementById("task-status-event");
  const listItemTrigger = optionsContainer.querySelectorAll(".status-options li");

  styleOptions(listItemTrigger);
  attachOptionListeners(listItemTrigger, optionsContainer);
  setupToggle(optionsTrigger, optionsContainer);
  setupOutsideClick(optionsTrigger, optionsContainer);
}