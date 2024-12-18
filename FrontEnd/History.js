const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');
const profilePasienNama = document.getElementById('nama-pasien')
const profilePasienAlamat = document.getElementById('alamat-pasien')
const profilePasienNoTelp = document.getElementById('noTelp-pasien')
const profilePasienLogout = document.getElementById('logout-pasien')
const apiUrl = 'http://localhost:8080'

const userInfo = getCookie('userInfo');
console.log(userInfo);

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${apiUrl}/api/pasien/findPasienById/${userInfo.id}`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data)

        populateHistoryTable(data.riwayatPendaftaran)

        profilePasienNama.innerHTML = `<i class="fas fa-user"></i> ${userInfo.nama}`
        profilePasienAlamat.innerHTML = `<i class="fa-solid fa-house"></i> ${userInfo.alamat}`
        profilePasienNoTelp.innerHTML = `<i class="fa-solid fa-phone"></i> ${userInfo.noTelp}`
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
}

function populateHistoryTable(riwayat) {
    const tableBody = document.querySelector('#pendaftaran-list tbody');
    tableBody.innerHTML = '';

    riwayat.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${formattingDate(item.tanggalDaftar)}</td>
      <td>${item.paket.namaPaket}</td>
      <td>${item.paket.jenisPemeriksaan}</td>
      <td>${item.paket.harga}</td>
    `;
        tableBody.appendChild(row);
    });
}

function formattingDate(unformattedDate) {

    const date = new Date(unformattedDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;

}

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
                window.location.href = "/FrontEnd/Login.html"
                clearAllCookies()
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