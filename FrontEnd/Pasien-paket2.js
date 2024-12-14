const categoryDetail = document.querySelector('.category-detail');
const categoryTitle = document.getElementById('category-title');
const categoryItemsContainer = document.querySelector('.category-items');
const backButton = document.querySelector('.back-button');
const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

// Fungsi untuk menampilkan detail kategori
function showCategoryDetail(categoryName) {
    categoryDetail.classList.add('active');
    categoryTitle.textContent = `KATEGORI: ${categoryName}`;

    categoryItemsContainer.innerHTML = '';
    if (categoryName === 'HEMATOLOGI') {
        addCategoryItem('Pemeriksaan Hematologi 1');
        addCategoryItem('Pemeriksaan Hematologi 2');
        addCategoryItem('Pemeriksaan Hematologi 3');
    } else if (categoryName === 'URINE') {
        addCategoryItem('Pemeriksaan Urine 1');
        addCategoryItem('Pemeriksaan Urine 2');
    } // ... tambahkan else if untuk kategori lain
}

// Fungsi untuk menambahkan item pemeriksaan
function addCategoryItem(itemName) {
    const item = document.createElement('div');
    item.classList.add('category-item');
    item.textContent = itemName;
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