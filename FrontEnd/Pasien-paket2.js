const categoryDetail = document.querySelector('.category-detail');
const categoryTitle = document.getElementById('category-title');
const categoryItemsContainer = document.querySelector('.category-items');
const backButton = document.querySelector('.back-button');
const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

// Data harga pemeriksaan
const itemPrices = {
    'Pemeriksaan Hematologi 1': 'Rp170.000',
    'Pemeriksaan Hematologi 2': 'Rp180.000',
    'Pemeriksaan Hematologi 3': 'Rp190.000',
    'Pemeriksaan Urine 1': 'Rp100.000',
    'Pemeriksaan Urine 2': 'Rp120.000',
};

// Fungsi untuk menampilkan detail kategori
function showCategoryDetail(categoryName) {
    categoryDetail.classList.add('active');
    categoryTitle.textContent = `KATEGORI: ${categoryName}`;

    categoryItemsContainer.innerHTML = '';

    const categoryItems = {
        'HEMATOLOGI': ['Pemeriksaan Hematologi 1', 'Pemeriksaan Hematologi 2', 'Pemeriksaan Hematologi 3'],
        'URINE': ['Pemeriksaan Urine 1', 'Pemeriksaan Urine 2'],
        // ... tambahkan kategori lain di sini (BELUM LENGKAP GES)
    };

    const items = categoryItems[categoryName];
    if (items) {
        items.forEach(itemName => {
            addCategoryItem(itemName, itemPrices[itemName]);
        });
    } else {
        console.error(`Kategori "${categoryName}" tidak ditemukan.`);
    }
}

// Fungsi untuk menambahkan item pemeriksaan
function addCategoryItem(itemName, itemPrice, categoryName) { // Tambahkan parameter categoryName
    const item = document.createElement('div');
    item.classList.add('category-item');

    const nameElement = document.createElement('div');
    nameElement.classList.add('item-name');
    nameElement.textContent = itemName;

    const priceElement = document.createElement('div');
    priceElement.classList.add('item-price');
    priceElement.textContent = itemPrice;

    const addButton = document.createElement('button');
    addButton.classList.add('add-to-cart');
    addButton.innerHTML = '+';

    // Event listener untuk klik item
    item.addEventListener('click', () => {
        // Kirim categoryName sebagai query parameter
        window.location.href = `detail-item.html?name=${encodeURIComponent(itemName)}&price=${encodeURIComponent(itemPrice)}&category=${encodeURIComponent(categoryName)}`;
    });

    item.appendChild(nameElement);
    item.appendChild(priceElement);
    item.appendChild(addButton);
    categoryItemsContainer.appendChild(item);
}

// Event listener untuk tombol kembali
backButton.addEventListener('click', () => {
    // Kembali ke Pasien-paket.html
    window.location.href = 'Pasien-paket.html';
});

// Tampilkan detail kategori "HEMATOLOGI" saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    showCategoryDetail('HEMATOLOGI');
});

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