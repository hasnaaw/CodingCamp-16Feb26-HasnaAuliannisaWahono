const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('todo-table-body');
const emptyMessage = document.getElementById('empty-message');
const filterStatus = document.getElementById('filter-status');
const deleteAllBtn = document.getElementById('delete-all-btn');

let todos = [];

// Fungsi Render List [Source: 30]
function renderTodos(data = todos) {
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        data.forEach((item) => {
            const originalIndex = todos.indexOf(item);
            const row = `
                <tr>
                    <td>${item.task}</td>
                    <td>${item.date}</td>
                    <td>${item.status}</td>
                    <td>
                        <button class="btn-action done-btn" onclick="toggleStatus(${originalIndex})">Done</button>
                        <button class="btn-action delete-btn" onclick="deleteTask(${originalIndex})">Del</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// Fitur Add + Validasi Konfirmasi [Source: 29, 31, 32]
addBtn.addEventListener('click', () => {
    const taskValue = todoInput.value.trim();
    const dateValue = dateInput.value;

    // 1. Validasi jika kosong
    if (taskValue === "" || dateValue === "") {
        alert("Please fill in both the task and the date!");
        return;
    }

    // 2. Validasi Konfirmasi (Yes/No) sesuai permintaanmu
    const isConfirmed = confirm("Are you sure you want to add this todo list?");

    if (isConfirmed) {
        const newTask = {
            task: taskValue,
            date: dateValue,
            status: 'Pending'
        };

        todos.push(newTask);
        
        // Reset Input
        todoInput.value = '';
        dateInput.value = '';
        filterStatus.value = 'all';
        renderTodos();
    } else {
        // Jika pilih No (Cancel), tidak terjadi apa-apa
        console.log("Add task cancelled by user.");
    }
});

// Fitur Filter Status [Source: 31]
filterStatus.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === "all") {
        renderTodos(todos);
    } else {
        const filtered = todos.filter(t => t.status === selected);
        renderTodos(filtered);
    }
});

// Fitur Delete Satu per Satu [Source: 31]
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this specific task?")) {
        todos.splice(index, 1);
        renderTodos();
    }
}

// Fitur Delete All [Source: 26, 31]
deleteAllBtn.addEventListener('click', () => {
    if (todos.length > 0) {
        if (confirm("Are you sure you want to delete ALL tasks?")) {
            todos = [];
            renderTodos();
        }
    }
});

function toggleStatus(index) {
    todos[index].status = todos[index].status === 'Pending' ? 'Done' : 'Pending';
    renderTodos();
}