// Deklarasi Elemen
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('todo-table-body');
const emptyMessage = document.getElementById('empty-message');
const filterStatus = document.getElementById('filter-status');
const deleteAllBtn = document.getElementById('delete-all-btn');

let todos = [];

// Fungsi Render Tabel
function renderTodos(data = todos) {
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        data.forEach((item) => {
            // Mengambil index asli dari array 'todos' utama
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

// Fitur 1: Add To-Do & Validasi Input [Source: 29, 31, 32]
addBtn.addEventListener('click', () => {
    const taskValue = todoInput.value.trim();
    const dateValue = dateInput.value;

    if (taskValue === "" || dateValue === "") {
        alert("Harap isi Nama Tugas dan Tanggal!");
        return;
    }

    const newTask = {
        task: taskValue,
        date: dateValue,
        status: 'Pending'
    };

    todos.push(newTask);
    
    // Reset form
    todoInput.value = '';
    dateInput.value = '';
    
    // Reset filter ke 'all' saat menambah tugas baru
    filterStatus.value = 'all';
    renderTodos();
});

// Fitur 2: Filter berdasarkan Status [Source: 31]
filterStatus.addEventListener('change', (e) => {
    const selected = e.target.value;
    
    if (selected === "all") {
        renderTodos(todos);
    } else {
        const filtered = todos.filter(t => t.status === selected);
        renderTodos(filtered);
    }
});

// Fitur 3: Delete & Delete All [Source: 31]
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.addEventListener('click', () => {
    if (todos.length > 0) {
        if (confirm("Hapus semua tugas?")) {
            todos = [];
            renderTodos();
        }
    }
});

// Fitur Tambahan: Update Status
function toggleStatus(index) {
    todos[index].status = todos[index].status === 'Pending' ? 'Done' : 'Pending';
    renderTodos();
}