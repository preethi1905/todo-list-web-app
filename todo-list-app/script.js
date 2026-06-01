const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    taskCount.textContent = `Tasks: ${tasks.length}`;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        if(task.completed){
            taskInfo.classList.add("completed");
        }

        taskInfo.innerHTML =
            `${task.text}<br><small>📅 ${task.date || "No Due Date"}</small>`;

        taskInfo.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-btn");

        delBtn.addEventListener("click", () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskInfo);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });

    updateCount();
}

function addTask() {
    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        date:dueDate.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
    dueDate.value="";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.textContent = "☀ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});

clearBtn.addEventListener("click", () => {
    if(confirm("Delete all tasks?")){
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

renderTasks();