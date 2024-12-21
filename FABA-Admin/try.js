// Get modal and buttons
const addStudentBtn = document.querySelector('.add-student-btn');
const addStudentModal = document.getElementById('addStudentModal');
const closeModalBtn = document.getElementById('closeModal');
const addStudentForm = document.getElementById('addStudentForm');
const tableBody = document.querySelector('.student-table tbody');

// Variables to track editing mode
let isEditing = false;
let currentRow = null;

// Show modal for adding a student
addStudentBtn.addEventListener('click', () => {
    addStudentModal.style.display = 'block';
    addStudentForm.reset();
    isEditing = false; // Reset editing mode
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    addStudentModal.style.display = 'none';
});

// Add or Edit student functionality
addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const studentID = document.getElementById('studentID').value;
    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentStatus = document.getElementById('studentStatus').value;

    if (isEditing && currentRow) {
        // Update existing row
        currentRow.cells[0].textContent = studentID;
        currentRow.cells[1].textContent = studentName;
        currentRow.cells[2].textContent = studentEmail;
        currentRow.cells[3].innerHTML = `<span class="status ${studentStatus}">${studentStatus.charAt(0).toUpperCase() + studentStatus.slice(1)}</span>`;
        isEditing = false;
        currentRow = null;
    } else {
        // Create new table row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${studentID}</td>
            <td>${studentName}</td>
            <td>${studentEmail}</td>
            <td><span class="status ${studentStatus}">${studentStatus.charAt(0).toUpperCase() + studentStatus.slice(1)}</span></td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    }

    // Reset form and close modal
    addStudentForm.reset();
    addStudentModal.style.display = 'none';
});

// Handle Edit and Delete buttons dynamically
tableBody.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('edit-btn')) {
        // Edit functionality
        currentRow = target.closest('tr');
        const studentID = currentRow.cells[0].textContent;
        const studentName = currentRow.cells[1].textContent;
        const studentEmail = currentRow.cells[2].textContent;
        const studentStatus = currentRow.cells[3].textContent.toLowerCase();

        // Fill the form with current row data
        document.getElementById('studentID').value = studentID;
        document.getElementById('studentName').value = studentName;
        document.getElementById('studentEmail').value = studentEmail;
        document.getElementById('studentStatus').value = studentStatus;

        // Show modal and set editing mode
        addStudentModal.style.display = 'block';
        isEditing = true;
    }

    if (target.classList.contains('delete-btn')) {
        // Delete functionality
        const row = target.closest('tr');
        tableBody.removeChild(row);
    }
});
