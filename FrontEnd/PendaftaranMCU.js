// document.addEventListener('DOMContentLoaded', function() {

//     const tanggalDaftar = document.getElementById('tanggal-daftar');
//     const nama = document.getElementById('nama');
//     const alamat = document.getElementById('alamat');
//     const noTelp = document.getElementById('no-telp');
//     const paketMCU = document.getElementById('paket-mcu');
//     const status = document.getElementById('status');
//     const submitButton = document.querySelector('.btn');

//     submitButton.addEventListener('click', function(event) {
//         event.preventDefault();

//         const formData = {
//             tanggal: tanggalDaftar.value,
//             nama: nama.value,
//             alamat: alamat.value,
//             noTelp: noTelp.value,
//             paket: paketMCU.value,
//             status: 'Pending'
//         };

//         if (!formData.nama || !formData.alamat || !formData.noTelp || !formData.tanggal) {
//             alert('Harap lengkapi semua data pendaftaran!');
//             return;
//         }

//         addToHistoryTable(formData);

//         tanggalDaftar.value = '';
//         nama.value = '';
//         alamat.value = '';
//         noTelp.value = '';
//         paketMCU.value = 'paket-basic';
//         status.value = 'Pending';
//     });
//   });

const tanggalDaftar = document.getElementById('tanggal-daftar');
const nama = document.getElementById('nama');
const alamat = document.getElementById('alamat');
const noTelp = document.getElementById('no-telp');
const paketMCU = document.getElementById('paket-mcu');
const status = document.getElementById('status');
const submitButton = document.querySelector('.btn');
const apiUrl = 'http://localhost:8080';

async function fetchPaketData() {
    try {
        const response = await fetch(`${apiUrl}/api/admin/findAllPaket`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        populatePaketDropdown(data)

        

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function populatePaketDropdown(data) {
    paketMCU.innerHTML = '';

    data.forEach(paket => {
        const option = document.createElement('option');
        option.value = paket.idPaket
        option.innerHTML = paket.namaPaket;
        paketMCU.appendChild(option);
    });
}

submitButton.addEventListener('click', async function (event) {
    event.preventDefault();

    console.log(paketMCU.value)

    try {
        const response = await fetch(`${apiUrl}/api/admin/findPaketbyId/${paketMCU.value}`)
        if (!response.ok) {
            throw new Error('Network response findPaketById was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)

        const formDataPasien = {
            nama: nama.value,
            alamat: alamat.value,
            noTelp: noTelp.value,
        };

        const response2 = await fetch(`${apiUrl}/api/pasien/addPasien`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataPasien)
        });
        if (!response2.ok) {
            throw new Error('Network response addPasien was not ok ' + response.statusText);
        }
        const data2 = await response2.json();
        console.log(data2.id)

        const formDataPendaftaran = {
            tanggalDaftar: tanggalDaftar.value,
            paket: data,
        };

        console.log(formDataPendaftaran)

        const response3 = await fetch(`${apiUrl}/api/pasien/daftar-mcu/${data2.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataPendaftaran)
        });
        if (!response3.ok) {
            throw new Error('Network response daftarMCU was not ok ' + response.statusText);
        }
        alert('Pendaftaran berhasil!');

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }





    // if (!formData.nama || !formData.alamat || !formData.noTelp || !formData.tanggal) {
    //     alert('Harap lengkapi semua data pendaftaran!');
    //     return;
    // }

    // addToHistoryTable(formData);

    // tanggalDaftar.value = '';
    // nama.value = '';
    // alamat.value = '';
    // noTelp.value = '';
    // paketMCU.value = 'paket-basic';
    // status.value = 'Pending';
});


document.addEventListener('DOMContentLoaded', fetchPaketData)