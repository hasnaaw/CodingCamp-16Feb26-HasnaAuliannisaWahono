const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('todo-table-body');
const emptyMessage = document.getElementById('empty-message');
const filterStatus = document.getElementById('filter-status');
const deleteAllBtn = document.getElementById('delete-all-btn');
const confirmModal = document.getElementById('confirm-modal');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

let pendingTask = null;

let todos = [];

// Fungsi Render List
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

// Fitur Add + Validasi Konfirmasi
addBtn.addEventListener('click', () => {
    const taskValue = todoInput.value.trim();
    const dateValue = dateInput.value;

    if (taskValue === "" || dateValue === "") {
        alert("Please fill in both the task and the date!");
        return;
    }

    // Simpan sementara data
    pendingTask = {
        task: taskValue,
        date: dateValue,
        status: 'Pending'
    };

    // Tampilkan modal
    confirmModal.style.display = "flex";
});

// Jika klik YES
confirmYes.addEventListener('click', () => {
    if (pendingTask) {
        todos.push(pendingTask);
        pendingTask = null;

        todoInput.value = '';
        dateInput.value = '';
        filterStatus.value = 'all';
        renderTodos();
    }

    confirmModal.style.display = "none";
});

// Jika klik NO
confirmNo.addEventListener('click', () => {
    pendingTask = null;
    confirmModal.style.display = "none";
});

// Fitur Filter Status
filterStatus.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === "all") {
        renderTodos(todos);
    } else {
        const filtered = todos.filter(t => t.status === selected);
        renderTodos(filtered);
    }
});

// Fitur Delete Satu per Satu
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Fitur Delete All
deleteAllBtn.addEventListener('click', () => {
    if (todos.length > 0) {
        todos = [];
        renderTodos();
    }
});

function toggleStatus(index) {
    todos[index].status = todos[index].status === 'Pending' ? 'Done' : 'Pending';
    renderTodos();
}