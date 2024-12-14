function submitSchedule() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    
    if (date && time) {
        modalMessage.innerHTML = `
            <strong>Jadwal Berhasil Disimpan!</strong><br>
            <b>Tanggal:</b> ${date}<br>
            <b>Jam Kedatangan:</b> ${time}<br>
        `;
        modal.style.display = 'block'; // Show the modal
        modal.classList.remove('error-modal-content'); // Remove error class if present
    } else {
        modalMessage.innerHTML = `
            <strong>Kesalahan!</strong><br>
            Harap lengkapi semua field sebelum menyimpan jadwal.
        `;
        modal.style.display = 'block'; // Show the modal
        modal.classList.add('error-modal-content'); // Add error class for styling
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Hide the modal
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}