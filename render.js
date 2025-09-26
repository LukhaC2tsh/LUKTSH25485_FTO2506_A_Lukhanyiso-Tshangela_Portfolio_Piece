
const columns = [
    document.querySelector(`.column-div[data-status="todo"] .task-container`),
    document.querySelector(`.column-div[data-status="doing"] .task-container`),
    document.querySelector(`.column-div[data-status="done"] .task-container`)
]

export function renderTasks(task){
    columns.forEach(column => {

        column.innerHTML = "";
        
    });
}