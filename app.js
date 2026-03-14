// Step 1: Get references to the HTML elements we need
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Save all current todos to localStorage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll("li").forEach(function (li) {
        todos.push({
            text: li.firstChild.textContent,
            done: li.classList.contains("done"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage on page load
function loadTodos() {
    const saved = localStorage.getItem("todos");
    if (!saved) return;
    JSON.parse(saved).forEach(function (todo) {
        createTodoItem(todo.text, todo.done);
    });
}

// Creates a delete button that removes its parent <li> when clicked
function createDeleteBtn(li) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the click from also toggling "done"
        li.remove();
        saveTodos();
    });
    return deleteBtn;
}

// Creates a todo <li> and appends it to the list
function createTodoItem(text, done) {
    const li = document.createElement("li");
    li.textContent = text;
    if (done) li.classList.add("done");

    li.addEventListener("click", function () {
        li.classList.toggle("done");
        saveTodos();
    });

    li.appendChild(createDeleteBtn(li));
    todoList.appendChild(li);
}

// Creates a new todo item and adds it to the list
function addTodo() {
    const text = input.value.trim();
    if (text === "") return;

    createTodoItem(text, false);
    saveTodos();

    input.value = "";
}

// Listen for button click
addBtn.addEventListener("click", addTodo);

// Listen for Enter key press
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Load saved todos on page load
loadTodos();
