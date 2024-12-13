// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
    // Load and render stored data
    renderTable();
    renderCharts();

    // Attach event listener to Generate button
    document.querySelector('.generate-btn').addEventListener('click', filterReports);

    // Attach event listener to Export buttons
    document.querySelectorAll('.export-btn').forEach(button => {
        button.addEventListener('click', exportData);
    });

    // Add event listener to date inputs for real-time filtering
    document.querySelectorAll('.date-input').forEach(input => {
        input.addEventListener('input', filterReports);
    });

    // Add event listener to window for storage changes
    window.addEventListener('storage', () => {
        renderTable();
        renderCharts();
    });
});

// Function to render table
function renderTable(reports = JSON.parse(localStorage.getItem('reports')) || []) {
    const tbody = document.getElementById('report-tbody');
    tbody.innerHTML = '';

    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.type}</td>
            <td>${report.student}</td>
            <td><span class="status ${report.status.toLowerCase()}">${report.status}</span></td>
            <td>${report.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to render charts
function renderCharts() {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];

    const statusCounts = { Approved: 19, Rejected: 20, Pending: 9 };
    const monthlyCounts = new Array(12).fill(0);

    reports.forEach(report => {
        statusCounts[report.status]++;
        const month = new Date(report.date).getMonth();
        monthlyCounts[month]++;
    });

    // Pie Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'pie',
        data: {
            labels: ['Approved', 'Rejected', 'Pending'],
            datasets: [{
                data: [statusCounts.Approved, statusCounts.Rejected, statusCounts.Pending],
                backgroundColor: ['#1abc9c', '#e74c3c', '#f39c12']
            }]
        }
    });

    // Bar Chart
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Requests',
                data: monthlyCounts,
                backgroundColor: '#3498db'
            }]
        }
    });
}

// Function to filter reports by date
function filterReports() {
    const fromDate = new Date(document.getElementById('date-from').value);
    const toDate = new Date(document.getElementById('date-to').value);

    if (isNaN(fromDate) || isNaN(toDate)) {
        alert('Please select valid dates for filtering.');
        return;
    }

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const filteredReports = reports.filter(report => {
        const reportDate = new Date(report.date);
        return reportDate >= fromDate && reportDate <= toDate;
    });

    localStorage.setItem('filteredReports', JSON.stringify(filteredReports));
    renderTable(filteredReports);
}

// Function to export data
function exportData(event) {
    const format = event.target.textContent.includes('CSV') ? 'csv' : 'pdf';
    const reports = JSON.parse(localStorage.getItem('reports')) || [];

    if (format === 'csv') {
        const csvContent = [
            ['Request ID', 'Type', 'Student', 'Status', 'Date'],
            ...reports.map(report => [report.id, report.type, report.student, report.status, report.date])
        ].map(e => e.join(',')).join('\n');

        downloadFile('reports.csv', csvContent);
    } else if (format === 'pdf') {
        // For simplicity, this example uses text-based PDF generation
        const pdfContent = reports.map(report => `${report.id} | ${report.type} | ${report.student} | ${report.status} | ${report.date}`).join('\n');
        downloadFile('reports.pdf', pdfContent);
    }
}

// Function to download file
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Initialize reports in local storage
if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', JSON.stringify([
        { id: 'REQ001', type: 'Book', student: 'John Doe', status: 'Approved', date: '2024-11-01' },
        { id: 'REQ002', type: 'Financial Aid', student: 'Jane Smith', status: 'Pending', date: '2024-11-15' }
    ]));
}