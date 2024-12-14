// document.addEventListener("DOMContentLoaded", () => {
//     const paketData = [];
//     const pasienData = [];
//     const riwayatPendaftaran = []; 

//     const sectionTitle = document.getElementById("section-title");
//     const sections = document.querySelectorAll(".section");
//     const navItems = document.querySelectorAll(".nav-item");

//     const paketNamaInput = document.getElementById("paket-nama");
//     const paketJenisInput = document.getElementById("paket-jenis");
//     const paketHargaInput = document.getElementById("paket-harga");
//     const tambahPaketBtn = document.getElementById("tambah-paket");
//     const paketListTable = document.getElementById("paket-list").querySelector("tbody");

//     const laporanDariInput = document.getElementById("laporan-dari");
//     const laporanSampaiInput = document.getElementById("laporan-sampai");
//     const generateLaporanBtn = document.getElementById("generate-laporan");
//     const laporanListTable = document.getElementById("laporan-list").querySelector("tbody");

//     const riwayatPendaftaranTable = document.getElementById("riwayat-pendaftaran").querySelector("tbody");

//     function clearTable(tableBody) {
//         tableBody.innerHTML = "";
//     }

//     function renderPaketList() {
//         clearTable(paketListTable);
//         clearTable(filterPaketInput);

//         filterPaketInput.innerHTML = '<option value="">Pilih Paket</option>';

//         paketData.forEach((paket, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${paket.nama}</td>
//                 <td>${paket.jenis}</td>
//                 <td>${paket.harga}</td>
//                 <td>
//                     <button class="btn-success btn-small" data-index="${index}" onclick="editPaket(${index})">Edit</button>
//                     <button class="btn-primary btn-small" data-index="${index}" onclick="hapusPaket(${index})">Hapus</button>
//                 </td>
//             `;
//             paketListTable.appendChild(row);

//             const option = document.createElement("option");
//             option.value = paket.nama;
//             option.textContent = paket.nama;
//             filterPaketInput.appendChild(option);
//         });
//     }

//     function renderRiwayatPendaftaran() {
//         clearTable(riwayatPendaftaranTable);

//         riwayatPendaftaran.forEach(item => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${item.tanggal}</td>
//                 <td>${item.nama}</td>
//                 <td>${item.alamat}</td>
//                 <td>${item.noTelepon}</td>
//                 <td>${item.paket}</td>
//                 <td>${item.status}</td>
//             `;
//             riwayatPendaftaranTable.appendChild(row);
//         });
//     }

//     function tambahRiwayatPendaftaran(nama, alamat, noTelepon, paket, status) {
//         const tanggal = new Date().toLocaleDateString();
//         riwayatPendaftaran.push({ tanggal, nama, alamat, noTelepon, paket, status });
//         renderRiwayatPendaftaran();
//     }

//     tambahPaketBtn.addEventListener("click", () => {
//         const nama = paketNamaInput.value.trim();
//         const jenis = paketJenisInput.value;
//         const harga = parseFloat(paketHargaInput.value);

//         if (!nama || !jenis || isNaN(harga)) {
//             alert("Mohon lengkapi data paket.");
//             return;
//         }

//         paketData.push({ nama, jenis, harga });
//         renderPaketList();

//         paketNamaInput.value = "";
//         paketJenisInput.value = "";
//         paketHargaInput.value = "";
//     });

//     generateLaporanBtn.addEventListener("click", () => {
//         const dari = laporanDariInput.value;
//         const sampai = laporanSampaiInput.value;

//         if (!dari || !sampai) {
//             alert("Mohon pilih periode laporan.");
//             return;
//         }

//         const filteredData = pasienData.filter(pasien => {
//             const tanggal = new Date(pasien.tanggal);
//             return tanggal >= new Date(dari) && tanggal <= new Date(sampai);
//         });

//         renderLaporanList(filteredData);
//     });

//     navItems.forEach(item => {
//         item.addEventListener("click", () => {
//             const sectionId = item.getAttribute("data-section");
//             sectionTitle.textContent = item.querySelector("span").textContent;

//             sections.forEach(section => section.classList.remove("active"));
//             navItems.forEach(nav => nav.classList.remove("active"));

//             document.getElementById(sectionId).classList.add("active");
//             item.classList.add("active");
//         });
//     });

//     window.editPaket = (index) => {
//         const paket = paketData[index];
//         paketNamaInput.value = paket.nama;
//         paketJenisInput.value = paket.jenis;
//         paketHargaInput.value = paket.harga;

//         tambahPaketBtn.textContent = "Update";
//         tambahPaketBtn.onclick = () => {
//             paketData[index] = {
//                 nama: paketNamaInput.value.trim(),
//                 jenis: paketJenisInput.value,
//                 harga: parseFloat(paketHargaInput.value),
//             };
//             renderPaketList();
//             tambahPaketBtn.textContent = "Tambah";
//             tambahPaketBtn.onclick = tambahPaketBtn._originalClick;
//         };
//     };

//     window.hapusPaket = (index) => {
//         if (confirm("Yakin ingin menghapus paket ini?")) {
//             paketData.splice(index, 1);
//             renderPaketList();
//         }
//     };
// });

const sectionTitle = document.getElementById("section-title");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const editModal = document.getElementById('editModal');
const closeModalButton = document.getElementById('closeModal');
const paketIdEdit = document.getElementById('itemId');
const paketNamaEdit = document.getElementById('paket-nama-edit');
const paketJenisEdit = document.getElementById('paket-jenis-edit');
const paketHargaEdit = document.getElementById('paket-harga-edit');
const paketDeskripsiEdit = document.getElementById('paket-deskripsi-edit');
const editForm = document.getElementById('editForm');
const btnGenerate = document.getElementById('generate-laporan');
const inputLaporanDari = document.getElementById('laporan-dari');
const inputLaporanSampai = document.getElementById('laporan-sampai');
const totalHarga = document.getElementById('total-harga');
const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

const apiUrl = 'http://localhost:8080';

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const sectionId = item.getAttribute("data-section");
        sectionTitle.textContent = item.querySelector("span").textContent;

        sections.forEach(section => section.classList.remove("active"));
        navItems.forEach(nav => nav.classList.remove("active"));

        document.getElementById(sectionId).classList.add("active");
        item.classList.add("active");
    });
});

// dropdownIndicator.addEventListener('click', (event) => {
//     event.stopPropagation(); 
//     dropdown.classList.toggle('active'); 
// });

// document.addEventListener('click', (event) => {
//     if (!dropdown.contains(event.target)) {
//         dropdown.classList.remove('active'); 
//     }
// });

async function fetchPaketData() {
    try {
        const response = await fetch(`${apiUrl}/api/admin/findAllPaket`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        populatePaketTable(data);

        const response2 = await fetch(`${apiUrl}/api/admin/findAllPendaftaran`);
        if (!response2.ok) {
            throw new Error('Network response pendaftaran was not ok ' + response2.statusText);
        }
        const data2 = await response2.json();
        console.log(data2)
        populatePendaftaranTable(data2);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function deletePaket(id) {
    try {
        const response = await fetch(`${apiUrl}/api/admin/hapusPaketFromAdmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            }
        });
        if (response.ok) {
            location.reload()
        } else {
            console.error('Error deleting resource:', response.status, response.statusText);
        }

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function populatePendaftaranTable(riwayatList) {
    const tableBody = document.querySelector('#pendaftaran-list tbody');
    tableBody.innerHTML = '';

    riwayatList.forEach(riwayat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formattingDate(riwayat.tanggalDaftar)}</td>
            <td>${riwayat.paket.namaPaket}</td>
            <td>${riwayat.paket.jenisPemeriksaan}</td>
            <td>${riwayat.paket.harga}</td>
        `;
        tableBody.appendChild(row);
    })
}

function formattingDate(unformattedDate) {

    const date = new Date(unformattedDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;

}

function populateLaporanTable(laporanList) {
    const tableBody = document.querySelector('#laporan-list tbody');
    tableBody.innerHTML = '';

    laporanList.forEach(laporan => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${laporan.namaPaket}</td>
        <td>${formattingDate(laporan.tanggal)}</td>
        <td>${laporan.harga}</td>
    `;
        tableBody.appendChild(row);
    });
}

function populatePaketTable(paketList) {
    const tableBody = document.querySelector('#paket-list tbody');
    tableBody.innerHTML = '';

    paketList.forEach(paket => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${paket.idPaket}</td>
      <td>${paket.namaPaket}</td>
      <td>${paket.jenisPemeriksaan}</td>
      <td>${paket.deskripsiPaket.split(' ').slice(0, 10).join(' ')}...</td>
      <td>${paket.harga}</td>
      <td>
        <button class="btn-edit" id="edit-paket" data-id="${paket.idPaket}">Edit</button>
        <button class="btn-delete" id="delete-paket" data-id="${paket.idPaket}">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
    });

    tableBody.addEventListener('click', async function (event) {
        if (event.target.classList.contains('btn-edit')) {
            const idPaket = event.target.getAttribute('data-id');
            console.log('Edit button clicked for idPaket:', idPaket);
            // Call your edit function here with idPaket
            const paketData = await getPaketById(idPaket)
            paketIdEdit.value = idPaket;
            paketNamaEdit.value = paketData.namaPaket;
            paketJenisEdit.value = paketData.jenisPemeriksaan;
            paketDeskripsiEdit.value = paketData.deskripsiPaket;
            paketHargaEdit.value = paketData.harga;
            editModal.style.display = 'block';

        } else if (event.target.classList.contains('btn-delete')) {
            const idPaket = event.target.getAttribute('data-id');
            console.log('Delete button clicked for idPaket:', idPaket);
            event.preventDefault();
            deletePaket(idPaket);
        }
    });

    closeModalButton.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

}

async function addPaket() {
    const nama = document.getElementById('paket-nama').value;
    const jenis = document.getElementById('paket-jenis').value;
    const deskripsi = document.getElementById('paket-deskripsi').value;
    const harga = document.getElementById('paket-harga').value;

    console.log(nama);
    console.log(jenis);
    console.log(harga);

    const newPaket = {
        namaPaket: nama,
        jenisPemeriksaan: jenis,
        deskripsiPaket: deskripsi,
        harga: parseFloat(harga)
    };

    console.log(JSON.stringify(newPaket));

    try {
        const response = await fetch(`http://localhost:8080/api/admin/addPaketFromAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPaket)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        fetchPaketData();


        document.getElementById('paket-nama').value = '';
        document.getElementById('paket-jenis').value = '';
        document.getElementById('paket-harga').value = '';
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getPaketById(id) {
    try {
        const response = await fetch(`${apiUrl}/api/admin/findPaketbyId/${id}`)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

document.getElementById('tambah-paket').addEventListener('click', (event) => {
    event.preventDefault();
    addPaket();
});

editForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const idPaket = paketIdEdit.value;
    const updatedData = {
        namaPaket: paketNamaEdit.value,
        jenisPemeriksaan: paketJenisEdit.value,
        deskripsiPaket: paketDeskripsiEdit.value,
        harga: parseFloat(paketHargaEdit.value)
    };

    try {
        const response = await fetch(`${apiUrl}/api/admin/ubahPaketFromAdmin/${idPaket}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Optionally, you can handle the response here if needed

        // Close the modal
        editModal.style.display = 'none';

        // Optionally, refresh the data displayed in the table
        location.reload(); // Implement this function to refresh your table data
    } catch (error) {
        console.error('There was a problem with the update operation:', error);
    }
});

btnGenerate.addEventListener('click', async function (event) {
    event.preventDefault();

    const tanggalDari = inputLaporanDari.value;
    const tanggalSampai = inputLaporanSampai.value;

    const response = await fetch(`${apiUrl}/api/admin/laporanPemasukan?startDate=${tanggalDari}&endDate=${tanggalSampai}`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        populateLaporanTable(data.detail)
        totalHarga.innerHTML = data.total
})


document.addEventListener('DOMContentLoaded', fetchPaketData);

const searchTypeSelect = document.getElementById('search-type');
const namaInput = document.getElementById('cari-nama');
const paketSelect = document.getElementById('filter-paket');
const periodeAwalInput = document.getElementById('filter-periode-mulai');
const periodeAkhirInput = document.getElementById('filter-periode-akhir');
const searchBtn = document.getElementById('cari-btn');
const pasienListBody = document.querySelector('#pasien-list tbody');

searchTypeSelect.addEventListener('change', () => {
    const searchType = searchTypeSelect.value;
    
    // Hide all inputs first
    namaInput.style.display = 'none';
    paketSelect.style.display = 'none';
    periodeAwalInput.style.display = 'none';
    periodeAkhirInput.style.display = 'none';

    // Show relevant inputs based on search type
    switch(searchType) {
        case 'nama':
            namaInput.style.display = 'block';
            break;
        case 'paket':
            paketSelect.style.display = 'block';
            break;
        case 'periode':
            periodeAwalInput.style.display = 'block';
            periodeAkhirInput.style.display = 'block';
            break;
    }
});

//   // Search button click handler
//   searchBtn.addEventListener('click', async () => {
//     const searchType = searchTypeSelect.value;
//     let searchParams = {};

//     switch(searchType) {
//         case 'nama':
//             searchParams = { nama: namaInput.value };
//             break;
//         case 'paket':
//             searchParams = { paketId: paketSelect.value };
//             break;
//         case 'periode':
//             searchParams = { 
//                 startDate: periodeAwalInput.value, 
//                 endDate: periodeAkhirInput.value 
//             };
//             break;
//     }

//     try {
//         const queryString = new URLSearchParams(searchParams).toString();
//         const response = await fetch(`${apiUrl}/api/admin/searchPasien?${queryString}`);
//         const pasiens = await response.json();

//         // Clear previous results
//         pasienListBody.innerHTML = '';

//         // Populate table
//         pasiens.forEach(pasien => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${pasien.nama}</td>
//                 <td>${pasien.noIdentitas}</td>
//                 <td>${pasien.paket.namaPaket}</td>
//                 <td>${formattingDate(pasien.tanggalDaftar)}</td>
//                 <td>${pasien.alamat}</td>
//                 <td>${pasien.noTelp}</td>
//             `;
//             pasienListBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Error searching patients:', error);
//     }
// });

    // Toggle dropdown
    dropdownToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownToggle.classList.toggle('active');
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdownToggle.classList.remove('active');
            dropdownMenu.style.display = 'none';
        }
    });

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Handle dropdown item actions
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const action = link.getAttribute('data-action');

            switch(action) {
                case 'edit-profile':
                    console.log('Edit profile clicked');
                    dropdownToggle.classList.remove('active');
                    dropdownMenu.style.display = 'none';
                    break;
                case 'logout':
                    console.log('Logout clicked');
                    dropdownToggle.classList.remove('active');
                    dropdownMenu.style.display = 'none';
                    break;
            }
        });
    });
