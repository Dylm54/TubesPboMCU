document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const idPendaftaran = document.getElementById('id-pendaftaran');
    const tanggalDaftar = document.getElementById('tanggal-daftar');
    const paketMCU = document.getElementById('paket-mcu');
    const status = document.getElementById('status');
    const submitButton = document.querySelector('.btn');

    // Generate auto-generated ID
    idPendaftaran.value = 'MCU' + Math.floor(Math.random() * 1000 + 1);

    // Add event listener to form submission
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

      // Get form data
    const formData = {
        id: idPendaftaran.value,
        tanggal: tanggalDaftar.value,
        paket: paketMCU.value,
        status: 'Pending'
    };

      // Add new record to history table
    addToHistoryTable(formData);

      // Reset form
    idPendaftaran.value = 'MCU' + Math.floor(Math.random() * 1000 + 1);
    tanggalDaftar.value = '';
    paketMCU.value = 'paket-basic';
    status.value = 'Pending';
    });

    function addToHistoryTable(data) {
        const historyTable = document.querySelector('.history-container table tbody');
        const newRow = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = data.id;

        const tanggalCell = document.createElement('td');
        tanggalCell.textContent = data.tanggal;

        const paketCell = document.createElement('td');
        paketCell.textContent = data.paket.replace('paket-', 'Paket ');

        const statusCell = document.createElement('td');
        statusCell.textContent = data.status;

        const aksiCell = document.createElement('td');
        const detailLink = document.createElement('a');
        detailLink.href = '#';
        detailLink.classList.add('btn-detail');
        detailLink.textContent = 'Detail';
        aksiCell.appendChild(detailLink);

        newRow.appendChild(idCell);
        newRow.appendChild(tanggalCell);
        newRow.appendChild(paketCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(aksiCell);

        historyTable.appendChild(newRow);
    }

    // Make navigation menu interactive
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.forEach(function(link) {
                link.classList.remove('active');
        });
        this.classList.add('active');
        });
    });

    // Initialize history table with empty data
    const historyTable = document.querySelector('.history-container table tbody');
    historyTable.innerHTML = '';
});