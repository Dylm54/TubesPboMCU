const categoryDetail = document.querySelector('.category-detail');
const categoryTitle = document.getElementById('category-title');
const categoryItemsContainer = document.querySelector('.category-items');
const backButton = document.querySelector('.back-button');

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