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



function setupDropdown(task){
    const optionsContainer = document.getElementById('status-option-container');
    const optionsTrigger = document.getElementById('task-status-event');
    const listItemTrigger = optionsContainer.querySelectorAll('.status-options li');

    //sets the color of the options 
    listItemTrigger.forEach(li => {
      li.style.color = "var(--secondary-font-color)";
      li.style.fontWeight = "500";

      li.addEventListener("click", function(){
        document.getElementById("task-status").innerText = li.innerText.trim();
        optionsContainer.classList.remove('show-options');
        return li.innerText.trim();
      }
        
    )})

    

    optionsTrigger.querySelector('#task-status').innerText = task.status;

    optionsTrigger.addEventListener("click", function(event){
        event.stopPropagation();
        optionsContainer.classList.toggle('show-options');
    })
    

    document.addEventListener("click", function(event) {
        if (!optionsContainer.contains(event.target) && !optionsTrigger.contains(event.target)) {
        optionsContainer.classList.remove('show-options');
        }
    });
    
}
