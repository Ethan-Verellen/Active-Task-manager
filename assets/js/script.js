// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"))||[];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const element = document.getElementById("add")
const e2 = document.getElementById("taskboard")
const tc = $('#todo-cards');
const pc = $('#in-progress-cards');
const dc = $('#done-cards');
let i = 0; 

// Todo: create a function to generate a unique task id
function generateTaskId() {
let id = taskList.length + 1;
localStorage.setItem('nextId', id)
}

  
// Todo: create a function to create a task card
function createTaskCard(task) {   
    const cc = $('<p>');
    const ct = (task.name + "\n" + task.date + "\n" + task.description);
    const card = $('<section>');
    cc.addClass('card').text(ct);
    // const cd = $('<button>').addClass('delete').text('Delete')
    card.append(cc);
    card.draggable();
    // cd.addEventListener("click", handleDeleteTask)
    // The delete button and droppable do not work
    $( "#in-progress-cards" ).droppable({
        drop: function (event, ui) {
            console.log('works')
          }
        });
    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].location == "todo") {
        const test = createTaskCard(taskList[i]);
        tc.append(test);
    }
     else if (taskList.location == "progress") {
        const test = createTaskCard(taskList[i]);
        pc.append(test);
     }
     else {
        const test = createTaskCard(taskList[i]);
        cc.append(test);
     }
}
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    generateTaskId()
    $("#dialog").dialog();
    e2.addEventListener("submit", function handleAddTaskp2(event){
        event.preventDefault();
        const tn = document.getElementById('name').value;
        const d = document.getElementById('date').value;
        const de = document.getElementById('description').value;
        if (tn == "" || d == "" || de == "") {
            alert('Please fill in info.');
            return;
        }
        const temptask = {
            name: tn,
            date: d,
            description: de,
            id: nextId,
            location: 'todo',
        }
        taskList.push(temptask);
        const stask = JSON.stringify(taskList);
        localStorage.setItem('tasks', stask)
        $("#dialog").dialog('close');
        renderTaskList()
    })
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    console.log("test")

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
console.log("test")
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()
    generateTaskId()
    element.addEventListener("click", handleAddTask)
    $('#date').datepicker({
        changeMonth: true,
        changeYear: true,
      });
      $( "#in-progress-cards" ).droppable({
        accept: '.card',
        drop: function (event, ui) {
            console.log('works')
          }
        });
      });
