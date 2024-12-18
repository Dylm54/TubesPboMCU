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
const profileAdminNama = document.getElementById('nama-admin')
const profileAdminAlamat = document.getElementById('alamat-admin')
const profileAdminNoTelp = document.getElementById('noTelp-admin')
const profileAdminLogout = document.getElementById('logout-admin')

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
        
        const userInfo = getCookie('userInfo');
        console.log(userInfo);
        profileAdminNama.innerHTML = `<i class="fas fa-user"></i> ${userInfo.nama} (${userInfo.jabatan})`
        profileAdminAlamat.innerHTML = `<i class="fa-solid fa-house"></i> ${userInfo.alamat}`
        profileAdminNoTelp.innerHTML = `<i class="fa-solid fa-phone"></i> ${userInfo.noTelp}`
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
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

        editModal.style.display = 'none';
        location.reload();
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

const searchTypeSelect = document.getElementById('search-type');
const namaInput = document.getElementById('cari-nama');
const paketSelect = document.getElementById('filter-paket');
const periodeAwalInput = document.getElementById('filter-periode-mulai');
const periodeAkhirInput = document.getElementById('filter-periode-akhir');
const searchBtn = document.getElementById('cari-btn');
const pasienListBody = document.querySelector('#pasien-list tbody');

searchTypeSelect.addEventListener('change', async () => {
    const searchType = searchTypeSelect.value;

    namaInput.style.display = 'none';
    paketSelect.style.display = 'none';
    periodeAwalInput.style.display = 'none';
    periodeAkhirInput.style.display = 'none';

    switch (searchType) {
        case 'nama':
            namaInput.style.display = 'block';
            break;
        case 'paket':
            try {
                const response = await fetch(`${apiUrl}/api/admin/findAllPaket`)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log(data)
                data.forEach(paket => {
                    const option = document.createElement('option');
                    option.value = paket.namaPaket;
                    option.textContent = paket.namaPaket;
                    paketSelect.appendChild(option);
                });
                paketSelect.style.display = 'block';
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            paketSelect.style.display = 'block';

            break;
        case 'periode':
            periodeAwalInput.style.display = 'block';
            periodeAkhirInput.style.display = 'block';
            break;
    }
});

searchBtn.addEventListener('click', async () => {
    const searchType = searchTypeSelect.value;
    let searchParams = {};

    switch (searchType) {
        case 'nama':
            searchParams = { nama: namaInput.value };
            break;
        case 'paket':
            searchParams = { namaPaket: paketSelect.value };
            break;
        case 'periode':
            searchParams = {
                startDate: periodeAwalInput.value,
                endDate: periodeAkhirInput.value
            };
            break;
    }

    console.log(searchParams)

    try {
        let response;

        if (searchType === 'nama') {
            response = await fetch(`${apiUrl}/api/admin/cariPasienByNama/${searchParams.nama}`)
        } else if (searchType === 'periode') {
            response = await fetch(`${apiUrl}/api/admin/findPasienByPeriodeMCU?startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`)
        } else if (searchType === 'paket') {
            response = await fetch(`${apiUrl}/api/admin/cariPasienByPaket?namaPaket=${searchParams.namaPaket}`)
        }
        const pasiens = await response.json();
        console.log(pasiens)
        pasienListBody.innerHTML = '';

        pasiens.forEach(pasien => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pasien.nama}</td>
                <td>${pasien.alamat}</td>
                <td>${pasien.noTelp}</td>
                <td>
                    <ol>
                        ${pasien.riwayatPendaftaran.map(mcu =>
                `<li>${mcu.paket.namaPaket} - (${formattingDate(mcu.tanggalDaftar)})</li>`
            ).join('')}
                    </ol>
                </td>
            `;
            pasienListBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error searching patients:', error);
    }
});

dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownToggle.classList.toggle('active');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdownToggle.classList.remove('active');
        dropdownMenu.style.display = 'none';
    }
});

dropdownMenu.addEventListener('click', (event) => {
    event.stopPropagation();
});

dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const action = link.getAttribute('data-action');

        switch (action) {
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

function clearAllCookies() {
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
}

profileAdminLogout.addEventListener('click', () => {
    clearAllCookies();
    window.location.href = "/FrontEnd/LoginAdmin.html"
})

document.addEventListener('DOMContentLoaded', fetchPaketData);