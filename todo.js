// Selecting elements
const inputBox = document.getElementById("text");
const listContainer = document.getElementById("List-container");
const addButton = document.querySelector("button");

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    // Clear the input
    inputBox.value = "";

    // Save the current list
    saveData();
}

// Add task on button click
addButton.addEventListener("click", addTask);

// Toggle checked class and remove item on click
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// Add close (×) button to each task
function addCloseButton(li) {
    const span = document.createElement("span");
    span.textContent = "\u00d7"; // Unicode for ×
    span.style.marginLeft = "10px";
    span.style.color = "red";
    span.style.cursor = "pointer";
    li.appendChild(span);
}

// Load saved tasks on page load
function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Hook into task creation to add close buttons
const originalAppendChild = listContainer.appendChild.bind(listContainer);
listContainer.appendChild = function (li) {
    addCloseButton(li);
    return originalAppendChild(li);
};

// Initialize
loadTasks();
