const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("input-el");
const clearBtn = document.getElementById("clear-btn");
const ulEl = document.getElementById("ul-el");
const pendingTasks = document.getElementById("pending-tasks");

pendingTasks.innerHTML = 0;

let todoList = [];

function addTaskToList() {
    if (inputEl.value.trim() != "")
        todoList.push(inputEl.value)
    clearBtn.hidden = false;
    inputEl.value = ""

    showTodoList()
}

function showTodoList() {

    let newLi = ""

    todoList.forEach((task, index) => {
        newLi = newLi +=
            `
            <li>
                ${task}  
                <span class="icon" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can"></i></span>       
            </li>               
            `
    });

    ulEl.innerHTML = newLi;

    localStorage.setItem("list", JSON.stringify(todoList))

    pendingTasks.innerHTML = todoList.length;
}

function deleteTask(index) {
    todoList.splice(index, 1);
    if (todoList.length === 0) {
        clearBtn.hidden = true;
    }
    showTodoList()
}

function clearAllTasks() {
    todoList = [];
    showTodoList();
    clearBtn.hidden = true;
}

function reloadTodoList() {
    const listFromLocalStorage = localStorage.getItem("list")
    if (listFromLocalStorage) {
        todoList = JSON.parse(listFromLocalStorage)
    }
    clearBtn.hidden = false;
    showTodoList()
}

reloadTodoList()

inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskToList();
    }
});