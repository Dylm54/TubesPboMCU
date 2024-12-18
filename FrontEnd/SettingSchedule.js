const paketDetailNamaPasien = document.getElementById('paket-detail-nama-pasien')
const paketDetailNamaPaket = document.getElementById('paket-detail-nama')
const paketDetailHarga = document.getElementById('paket-detail-harga')
const paketDetailTotal = document.getElementById('paket-detail-total')
const inputTanggal = document.getElementById('date')
const checkoutBtn = document.getElementById('checkout')
const apiUrl = 'http://localhost:8080'

document.addEventListener('DOMContentLoaded', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idItem = urlParams.get('idPaket');
    console.log(idItem)

    const userInfo = getCookie('userInfo');
    console.log(userInfo);

    paketDetailNamaPasien.innerHTML = userInfo.nama

    try {
        const response = await fetch(`${apiUrl}/api/admin/findPaketbyId/${idItem}`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data)

        paketDetailNamaPaket.textContent = data.namaPaket
        paketDetailHarga.textContent = `Rp${data.harga}`
        paketDetailTotal.textContent = `Rp${data.harga}`

        

        checkoutBtn.addEventListener('click', async () => {
            const formDataPendaftaran = {
                tanggalDaftar: inputTanggal.value,
                paket: data,
            };

            console.log(formDataPendaftaran)

            try {
                const response = await fetch(`${apiUrl}/api/pasien/daftar-mcu/${userInfo.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataPendaftaran)
                });
                if (!response.ok) {
                    throw new Error('Network response daftarMCU was not ok ' + response.statusText);
                }
                alert('Pendaftaran berhasil!');
                window.location.href = 'Pasien-paket.html'
            } catch (error) {
                console.error('There was a problem with the daftar-mcu fetch operation:', error);
            }
        })

    } catch (error) {
        console.error('There was a problem with the findPaketById fetch operation:', error);
    }
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
}

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
        modal.style.display = 'block';
        modal.classList.remove('error-modal-content');
    } else {
        modalMessage.innerHTML = `
            <strong>Kesalahan!</strong><br>
            Harap lengkapi semua field sebelum menyimpan jadwal.
        `;
        modal.style.display = 'block';
        modal.classList.add('error-modal-content');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}