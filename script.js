// Get DOM elements
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const loginBtn = document.getElementById('loginBtn');

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task when form is submitted
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission
    addTask();
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;  // Don't add empty tasks
    
    // Create task item
    const taskItem = createTaskElement(taskText);
    
    // Add task to list
    taskList.appendChild(taskItem);
    
    // Save tasks to localStorage
    saveTasks();
    
    // Clear input
    taskInput.value = '';
}

// Function to create a new task element
function createTaskElement(taskText) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    
    // Create task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.textContent = 'Delete';
    
    // Add event listeners
    checkbox.addEventListener('change', function() {
        span.classList.toggle('completed');
        saveTasks();
    });
    
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });
    
    // Assemble task item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.querySelector('.task-checkbox').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        const checkbox = taskItem.querySelector('.task-checkbox');
        const span = taskItem.querySelector('.task-text');
        
        if (task.completed) {
            checkbox.checked = true;
            span.classList.add('completed');
        }
        
        taskList.appendChild(taskItem);
    });
}

// Login button click handler (to be implemented with Firebase later)
loginBtn.addEventListener('click', function() {
    alert('Login functionality will be implemented later!');
});
