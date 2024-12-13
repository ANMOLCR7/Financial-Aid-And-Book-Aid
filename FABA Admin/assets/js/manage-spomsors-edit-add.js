// Handle Add Sponsor Modal
document.querySelector('.add-sponsor-btn').addEventListener('click', () => {
    document.getElementById('add-sponsor-modal').style.display = 'block';
});

document.querySelector('.close-modal-btn').addEventListener('click', () => {
    document.getElementById('add-sponsor-modal').style.display = 'none';
});

document.getElementById('add-sponsor-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const sponsorName = document.getElementById('sponsor-name').value;
    const sponsorEmail = document.getElementById('sponsor-email').value;
    const sponsorContribution = document.getElementById('sponsor-contribution').value;
    const sponsorStatus = document.getElementById('sponsor-status').value;

    const tbody = document.getElementById('sponsor-tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="checkbox" class="select-sponsor"></td>
        <td>SP${Date.now()}</td>
        <td>${sponsorName}</td>
        <td>${sponsorEmail}</td>
        <td>$${sponsorContribution}</td>
        <td><span class="status ${sponsorStatus}">${sponsorStatus.charAt(0).toUpperCase() + sponsorStatus.slice(1)}</span></td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    tbody.appendChild(newRow);
    document.getElementById('add-sponsor-modal').style.display = 'none';
});

// Edit Sponsor Logic
document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const sponsorName = row.cells[2].textContent;
        const sponsorEmail = row.cells[3].textContent;
        const sponsorContribution = row.cells[4].textContent.replace('$', '');
        const sponsorStatus = row.cells[5].textContent.toLowerCase();

        // Pre-populate modal or form to edit the sponsor
        document.getElementById('sponsor-name').value = sponsorName;
        document.getElementById('sponsor-email').value = sponsorEmail;
        document.getElementById('sponsor-contribution').value = sponsorContribution;
        document.getElementById('sponsor-status').value = sponsorStatus;

        document.getElementById('add-sponsor-modal').style.display = 'block';
        // Change modal title to "Edit Sponsor"
        document.querySelector('.modal-content h3').textContent = 'Edit Sponsor';
        
        // Update logic for saving changes
        document.getElementById('add-sponsor-form').onsubmit = function (e) {
            e.preventDefault();
            row.cells[2].textContent = document.getElementById('sponsor-name').value;
            row.cells[3].textContent = document.getElementById('sponsor-email').value;
            row.cells[4].textContent = `$${document.getElementById('sponsor-contribution').value}`;
            row.cells[5].textContent = document.getElementById('sponsor-status').value.charAt(0).toUpperCase() + document.getElementById('sponsor-status').value.slice(1);
            document.getElementById('add-sponsor-modal').style.display = 'none';
        };
    });
});

// Delete Sponsor Logic
document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        row.remove();
    });
});

// Bulk Select Logic
document.getElementById('select-all-header').addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.select-sponsor');
    checkboxes.forEach((checkbox) => checkbox.checked = event.target.checked);
});

// Bulk Actions
document.querySelector('.bulk-activate-btn').addEventListener('click', () => {
    const selectedRows = document.querySelectorAll('.select-sponsor:checked');
    selectedRows.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.querySelector('.status').textContent = 'Active';
    });
});

document.querySelector('.bulk-deactivate-btn').addEventListener('click', () => {
    const selectedRows = document.querySelectorAll('.select-sponsor:checked');
    selectedRows.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.querySelector('.status').textContent = 'Inactive';
    });
});

document.querySelector('.bulk-delete-btn').addEventListener('click', () => {
    const selectedRows = document.querySelectorAll('.select-sponsor:checked');
    selectedRows.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.remove();
    });
});
