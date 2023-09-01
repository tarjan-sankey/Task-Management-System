const tasksArray = [
    // {
    //     id: 1,
    //     name: "Task one",
    //     startDate: new Date("2023-09-01"),
    //     endDate: new Date("2023-09-10"),
    //     status: "Pending",
    //     subtasks: [
    //         { 
    //             id: 101,
    //             name: "Subtask 1 of Task 1",
    //             startDate: new Date("2023-09-02"),
    //             endDate: new Date("2023-09-05"),
    //             status: "In Progress",
    //             subtasks: [
    //                 {
    //                     id: 1001,
    //                     name: "Sub-subtask 1 of Subtask 1",
    //                     startDate: new Date("2023-09-03"),
    //                     endDate: new Date("2023-09-04"),
    //                     status: "Completed",
    //                     subtasks: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: 102,
    //             name: "Subtask 2 of Task 1",
    //             startDate: new Date("2023-09-06"),
    //             endDate: new Date("2023-09-08"),
    //             status: "In Progress",
    //             subtasks: []
    //         }
    //     ]
    // },
    // {
    //     id: 2,
    //     name: "Task two",
    //     startDate: new Date("2023-09-05"),
    //     endDate: new Date("2023-09-15"),
    //     status: "In Progress",
    //     subtasks: []
    // }

];

let usedIds = new Set();

document.getElementById('add-task').addEventListener('submit', (event)=>{
    event.preventDefault();
})

document.getElementById('add-sub-task').addEventListener('submit', (event)=>{
    event.preventDefault();
})

// Function to add a task
function addTask() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    let status = document.getElementById('status').value;

    if(id == "" || name == "" || startDate == "" || endDate == "" || status == ""){
        alert("All fields are mendatory");
        throw new Error(`All fields are mendatory`);
    }

    // checking for used ids
    if (usedIds.has(id)) {
        alert(`Task ID '${id}' is already in use.`);
        throw new Error(`Task ID '${id}' is already in use.`);
    }

    // checking for date validation
    if (startDate > endDate) {
        alert('Start Date cant be less than End Date');
        throw new Error(`Start Date cant be less than End Date`);
    }

    // adding used id to record
    usedIds.add(id);

    const task = {
        id: id,
        name: name,
        startDate: startDate,
        endDate: endDate,
        status: status,
        subtasks: []
    };
    tasksArray.push(task);
    displayTasks(tasksArray, taskListBody);
    return task;
}


// Function to add a subtask to a task
function addSubTask(taskId, subtask) {
    console.log('addSubTask() envoked with: ', taskId, subtask);
    
    const task = tasksArray.find(task => task.id == taskId);
    console.log('addSubTask task: ',task);
    if (!task) {
        document.getElementById('add-sub-task').style.display = "none";
        throw new Error("Task not found.");
    }
    if (task.subtasks.length < 3) {
        task.subtasks.push(subtask);
        document.getElementById('add-sub-task').style.display = "none";
        displayTasks(tasksArray, taskListBody);
    } else {
        throw new Error("Maximum number of subtasks reached for the task.");
    }
}


// Function to edit a task
function editTask(id, name, startDate, endDate, status) {
    const task = tasksArray.find(task => task.id === id);
    if (!task) {
        throw new Error("Task not found.");
    }
    task.name = name;
    task.startDate = startDate;
    task.endDate = endDate;
    task.status = status;
}

// Function to edit a subtask of a task
function editSubtaskOfTask(taskId, subtaskId, name, startDate, endDate, status) {
    const task = tasksArray.find(task => task.id === taskId);
    if (!task) {
        throw new Error("Task not found.");
    }
    const subtask = task.subtasks.find(sub => sub.id === subtaskId);
    if (!subtask) {
        throw new Error("Subtask not found.");
    }
    subtask.name = name;
    subtask.startDate = startDate;
    subtask.endDate = endDate;
    subtask.status = status;
}


// Function to delete a task
function deleteTask(id) {
    console.log('deleteTask func called!');
    const taskIndex = tasksArray.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
        const deletedTask = tasksArray.splice(taskIndex, 1)[0];
        usedIds.delete(id); // Remove the ID from the used IDs set
        console.log('deleted task: ', deletedTask);
        displayTasks(tasksArray, taskListBody);
        return deletedTask;
    } else {
        throw new Error("Task not found.");
    }
}


// Function to delete a subtask of a task
function deleteSubtaskOfTask(taskId, subtaskId) {
    const task = tasksArray.find(task => task.id === taskId);
    if (!task) {
        throw new Error("Task not found.");
    }
    const subtaskIndex = task.subtasks.findIndex(sub => sub.id === subtaskId);
    if (subtaskIndex !== -1) {
        return task.subtasks.splice(subtaskIndex, 1)[0];
    } else {
        throw new Error("Subtask not found.");
    }
}


function displayTasks(tasks, parentElement) {
    parentElement.innerHTML = "";
    tasks.forEach(task => {
        const taskRow = document.createElement('tr');
        startDate = task.startDate;
        endDate = task.endDate;

        taskRow.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>${task.status}</td>
            <td>
                <button>Edit</button>
                <button onclick="deleteTask(${task.id});" id="${task.id}">Delete</button>
                <button>Add SubTask</button>
            </td>
        `;
        parentElement.appendChild(taskRow);

    });
}

var taskListBody = document.getElementById('taskListBody');
displayTasks(tasksArray, taskListBody);


// Example usage
// const task1 = addTask(1, "Task One", new Date("2023-09-01"), new Date("2023-09-10"), "Pending");
// const subtask1 = {id: 101, name: "Subtask 1 of Task 1", startDate: new Date("2023-09-02"), endDate: new Date("2023-09-05"), status: "In Progress", subtasks: [] };
// const subsubtask1 = { id: 1001, name: "Sub-subtask 1 of Subtask 1", startDate: new Date("2023-09-03"), endDate: new Date("2023-09-04"), status: "Completed", subtasks: [] };

// addSubTask(task1.id, subtask1);
// addSubTaskToSubtask(subtask1.id, subsubtask1);

// console.log(tasksArray);


// // Example usage
// editTask(1, "Updated Task One", new Date("2023-09-01"), new Date("2023-09-15"), "In Progress");
// editSubtaskOfTask(1, 101, "Updated Subtask 1 of Task 1", new Date("2023-09-03"), new Date("2023-09-08"), "Completed");

// console.log(tasksArray);


// // Example usage
// editSubtaskOfSubtask(1, 101, 1001, "Updated Sub-subtask 1 of Subtask 1", new Date("2023-09-03"), new Date("2023-09-05"), "In Progress");

// console.log(tasksArray);


// // Example usage
// const deletedTask = deleteTask(2);
// const deletedSubtask = deleteSubtaskOfTask(1, 101);

// console.log(deletedTask);
// console.log(deletedSubtask);
// console.log(tasksArray);


// // Example usage
// const deletedSubsubtask = deleteSubtaskOfSubtask(1, 101, 1001);

// console.log(deletedSubsubtask);
// console.log(tasksArray);
