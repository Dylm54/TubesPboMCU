document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('name');
    const itemPrice = urlParams.get('price');
    const categoryName = urlParams.get('category'); // Ambil kategori dari URL

    const itemNameElement = document.getElementById('item-name');
    const itemPriceElement = document.getElementById('item-price');
    const itemDescriptionElement = document.getElementById('item-description');
    const backButton = document.querySelector('.back-button');

    itemNameElement.textContent = itemName;
    itemPriceElement.textContent = itemPrice;

    // Data deskripsi (bisa dipindahkan ke file JSON terpisah jika banyak)
    const itemDescriptions = {
        'Pemeriksaan Hematologi 1': 'Merupakan panel pemeriksaan yg terdiri dari Hemoglobin, Lekosit, Trombosit, Hematokrit, Hitung Jenis, LED, Eritosit, dan nilai-nilai MC. Pemeriksaan Hematologi merupakan pemeriksaan dasar yang digunakan secara luas mulai sebagai pemeriksaan penyaring , diagnosis maupun untuk mengikuti perkembangan penyakit, diantaranya penyakit infeksi, kelainan darah, penyakit degeneratif, dan lainnya . Spesimen Pemeriksaan : Darah dengan antikoagulan EDTA. Persiapan Pemeriksaan : Tidak ada persiapan khusus',
        'Pemeriksaan Hematologi 2': 'Deskripsi untuk Pemeriksaan Hematologi 2...',
        'Pemeriksaan Hematologi 3': 'Deskripsi untuk Pemeriksaan Hematologi 3...',
        'Pemeriksaan Urine 1': 'Deskripsi untuk Pemeriksaan Urine 1...',
        'Pemeriksaan Urine 2': 'Deskripsi untuk Pemeriksaan Urine 2...',
    };

    itemDescriptionElement.textContent = itemDescriptions[itemName] || 'Deskripsi tidak tersedia.';

    // Event listener untuk tombol varian
    const variantButtons = document.querySelectorAll('.variant-button');
    variantButtons.forEach(button => {
        button.addEventListener('click', () => {
            variantButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Update href pada tombol kembali
    if (categoryName) {
        backButton.href = `Pasien-paket2.html?category=${encodeURIComponent(categoryName)}`;
    } else {
        backButton.href = `Pasien-paket.html`;
    }
});