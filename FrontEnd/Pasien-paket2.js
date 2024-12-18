const categoryDetail = document.querySelector('.category-detail');
const categoryTitle = document.getElementById('category-title');
const categoryItemsContainer = document.querySelector('.category-items');
const backButton = document.querySelector('.back-button');
const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');
const profilePasienNama = document.getElementById('nama-pasien')
const profilePasienAlamat = document.getElementById('alamat-pasien')
const profilePasienNoTelp = document.getElementById('noTelp-pasien')
const profilePasienLogout = document.getElementById('logout-pasien')
const apiUrl = 'http://localhost:8080'

async function fetchPaketData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const kategori = urlParams.get('kategori');

    try {
        const response = await fetch(`${apiUrl}/api/admin/findPaketbyJenis?jenisPemeriksaan=${kategori}`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data)

        showCategoryDetail(kategori, data);

        const userInfo = getCookie('userInfo');
        console.log(userInfo);
        profilePasienNama.innerHTML = `<i class="fas fa-user"></i> ${userInfo.nama}`
        profilePasienAlamat.innerHTML = `<i class="fa-solid fa-house"></i> ${userInfo.alamat}`
        profilePasienNoTelp.innerHTML = `<i class="fa-solid fa-phone"></i> ${userInfo.noTelp}`
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
}

function showCategoryDetail(categoryName, daftarPaket) {
    categoryDetail.classList.add('active');
    categoryTitle.textContent = `KATEGORI: ${categoryName}`;

    categoryItemsContainer.innerHTML = '';

    const items = daftarPaket;
    if (items) {
        items.forEach(itemName => {
            addCategoryItem(itemName.namaPaket, itemName.harga, itemName.idPaket);
        });
    } else {
        console.error(`Kategori "${categoryName}" tidak ditemukan.`);
    }
}


function addCategoryItem(itemName, itemPrice, itemId) {
    const item = document.createElement('div');
    item.classList.add('category-item');

    const nameElement = document.createElement('div');
    nameElement.classList.add('item-name');
    nameElement.textContent = itemName;

    const priceElement = document.createElement('div');
    priceElement.classList.add('item-price');
    priceElement.textContent = `Rp${itemPrice}`;

    const addButton = document.createElement('button');
    addButton.classList.add('add-to-cart');
    addButton.innerHTML = '+';

    item.addEventListener('click', () => {
        window.location.href = `detail-item.html?id=${itemId}`;
    });

    item.appendChild(nameElement);
    item.appendChild(priceElement);
    item.appendChild(addButton);
    categoryItemsContainer.appendChild(item);
}

backButton.addEventListener('click', () => {
    window.location.href = 'Pasien-paket.html';
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

function clearAllCookies() {
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
}

dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {

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



document.addEventListener('DOMContentLoaded', fetchPaketData);