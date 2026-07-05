let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounter() {
    const done = tasks.filter(t => t.done).length;
    document.getElementById('counter').textContent = `${done}/${tasks.length} tasks completed`;
}

function renderTasks(list = tasks) {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';
    list.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `${task.priority} ${task.done ? 'done' : ''}`;

        li.innerHTML = `
      <div class="task-info">
        <span class="task-text">${task.text}</span>
        <span class="task-meta">📅 ${task.date || 'No date'} | ${task.priority} priority</span>
      </div>
      <div class="task-actions">
        <button class="done-btn" onclick="toggleDone(${index})">✅</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
        ul.appendChild(li);
    });
    updateCounter();
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    const date = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({ text, date, priority, done: false });
    saveTasks();
    renderTasks();
    input.value = '';
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function filterTasks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = tasks.filter(t => t.text.toLowerCase().includes(query));
    renderTasks(filtered);
}

document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

renderTasks();