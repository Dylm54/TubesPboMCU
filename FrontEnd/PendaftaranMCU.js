document.addEventListener('DOMContentLoaded', function() {

  const tanggalDaftar = document.getElementById('tanggal-daftar');
  const nama = document.getElementById('nama');
  const alamat = document.getElementById('alamat');
  const noTelp = document.getElementById('no-telp');
  const paketMCU = document.getElementById('paket-mcu');
  const status = document.getElementById('status');
  const submitButton = document.querySelector('.btn');

  submitButton.addEventListener('click', function(event) {
      event.preventDefault();

      const formData = {
          tanggal: tanggalDaftar.value,
          nama: nama.value,
          alamat: alamat.value,
          noTelp: noTelp.value,
          paket: paketMCU.value,
          status: 'Pending'
      };

      if (!formData.nama || !formData.alamat || !formData.noTelp || !formData.tanggal) {
          alert('Harap lengkapi semua data pendaftaran!');
          return;
      }

      addToHistoryTable(formData);

      tanggalDaftar.value = '';
      nama.value = '';
      alamat.value = '';
      noTelp.value = '';
      paketMCU.value = 'paket-basic';
      status.value = 'Pending';
  });

  function addToHistoryTable(data) {
      const historyTable = document.querySelector('.history-container table tbody');
      const newRow = document.createElement('tr');

      const tanggalCell = document.createElement('td');
      tanggalCell.textContent = data.tanggal;

      const namaCell = document.createElement('td');
      namaCell.textContent = data.nama;

      const alamatCell = document.createElement('td');
      alamatCell.textContent = data.alamat;

      const noTelpCell = document.createElement('td');
      noTelpCell.textContent = data.noTelp;

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

      newRow.appendChild(tanggalCell);
      newRow.appendChild(namaCell);
      newRow.appendChild(alamatCell);
      newRow.appendChild(noTelpCell);
      newRow.appendChild(paketCell);
      newRow.appendChild(statusCell);
      newRow.appendChild(aksiCell);

      historyTable.appendChild(newRow);
  }

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

  
  const historyTable = document.querySelector('.history-container table tbody');
  historyTable.innerHTML = '';
});