// Step 1: Get references to the HTML elements we need
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Creates a delete button that removes its parent <li> when clicked
function createDeleteBtn(li) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the click from also toggling "done"
        li.remove();
    });
    return deleteBtn;
}

// Creates a new todo item and adds it to the list
function addTodo() {
    const text = input.value.trim();

    // Don't add empty todos
    if (text === "") return;

    // Create a new <li> element
    const li = document.createElement("li");
    li.textContent = text;

    // Click a todo to mark it as done (toggles strikethrough)
    li.addEventListener("click", function () {
        li.classList.toggle("done");
    });

    li.appendChild(createDeleteBtn(li));
    todoList.appendChild(li);

    // Clear the input field
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
