import { initializeModal } from "../modal/edit-modal/edit-modal.js";

//array of columns by status: todo, doing, done with parent elements with class names: "column-div"
const columns = {
    todo: document.querySelector(`.column-div[data-status="todo"] .tasks-container`),
    doing: document.querySelector(`.column-div[data-status="doing"] .tasks-container`),
    done: document.querySelector(`.column-div[data-status="done"] .tasks-container`)
}

//Creates a new task div element, class = "task-div" 
export function createTaskCard(task){
    const card = document.createElement('div');
    card.classList.add('task-div');
    card.innerHTML = `${task.title}`;
    card.id = task.id;

    card.addEventListener("click", function(){
        initializeModal(task);
    })

    return card;
}

//renders the tasks after clearing the previously opened tasks, under the column with the same status
export function renderTasks(tasks){
    //deletes the entire task card div
    Object.values(columns).forEach(column => {
        
        if(column){
            column.innerHTML = "";
        }

    });

    //appends a new task to the column with the same status
    tasks.forEach(task => {
        const column = columns[task.status.toLowerCase()];
        if(column){
            const card =  createTaskCard(task);
            column.appendChild(card);
        }
        
        
    });
}