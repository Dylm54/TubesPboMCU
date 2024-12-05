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
  });
  