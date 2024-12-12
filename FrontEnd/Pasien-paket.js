const carousel = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const dotsContainer = document.querySelector('.dots-container');

const categories = [
    { src: '/FrontEnd/Foto/hematologi.png', alt: 'Hematologi', text: 'HEMATOLOGI' },
    { src: '/FrontEnd/Foto/urine.png', alt: 'Urine', text: 'URINE' },
    { src: '/FrontEnd/Foto/feces.png', alt: 'Feces', text: 'FAECES' },
    { src: '/FrontEnd/Foto/cairan-tubuh.png', alt: 'Cairan Tubuh', text: 'CAIRAN TUBUH' },
    { src: '/FrontEnd/Foto/jantung.png', alt: 'Jantung', text: 'JANTUNG' },
    { src: '/FrontEnd/Foto/paru-paru.png', alt: 'Paru-Paru', text: 'PARU-PARU' },
    { src: '/FrontEnd/Foto/fungsi-hati.png', alt: 'Fungsi Hati', text: 'FUNGSI HATI' },
    { src: '/FrontEnd/Foto/lambung-pankreas.png', alt: 'Lambung & Pankreas', text: 'LAMBUNG & PANKREAS' },
    { src: '/FrontEnd/Foto/fungsi-ginjal.png', alt: 'Fungsi Ginjal', text: 'FUNGSI GINJAL' },
    { src: '/FrontEnd/Foto/lemak-darah.png', alt: 'Lemak Darah', text: 'LEMAK DARAH' },
    { src: '/FrontEnd/Foto/glukosa-darah.png', alt: 'Glukosa Darah', text: 'GLUKOSA DARAH' },
    { src: '/FrontEnd/Foto/elektrolit.png', alt: 'Elektrolit', text: 'ELEKTROLITE & TRACE ELEMENT' },
     { src: '/FrontEnd/Foto/vitamin.png', alt: 'Vitamin', text: 'VITAMIN' },
    { src: '/FrontEnd/Foto/hepatitis.png', alt: 'Hepatitis', text: 'HEPATITIS' },
    { src: '/FrontEnd/Foto/torch.png', alt: 'Torch & STD', text: 'TORCH & STD' },
    { src: '/FrontEnd/Foto/covid.png', alt: 'Covid-19', text: 'COVID-19' },
    { src: '/FrontEnd/Foto/penyakit-infeksi.png', alt: 'Penyakit Infeksi', text: 'PENYAKIT INFEKSI' },
    { src: '/FrontEnd/Foto/autoimun.png', alt: 'Autoimun', text: 'AUTOIMUN' },
    { src: '/FrontEnd/Foto/osteoporosis.png', alt: 'Osteoporosis', text: 'OSTEOPORESIS' },
    { src: '/FrontEnd/Foto/penanda-tumor.png', alt: 'Penanda Tumor', text: 'PENANDA TUMOR' },
    { src: '/FrontEnd/Foto/endokrin.png', alt: 'Endokrin', text: 'ENDOKRIN' },
    { src: '/FrontEnd/Foto/alergi.png', alt: 'Alergi', text: 'ALERGI' },
    { src: '/FrontEnd/Foto/drug-abuse.png', alt: 'Drug Abuse', text: 'DRUG ABUSE/NAPZA' },
    { src: '/FrontEnd/Foto/mikrobiologi.png', alt: 'Mikrobiologi', text: 'MIKROBIOLOGI' },
     { src: '/FrontEnd/Foto/molekular-diagnostik.png', alt: 'Molekular Diagnostik', text: 'MOLEKULAR DIAGNOSTIK' },
    { src: '/FrontEnd/Foto/patologi-anatomi.png', alt: 'Patologi Anatomi', text: 'PATHOLOGI ANATOMI' },
    { src: '/FrontEnd/Foto/elektrodiagnostik.png', alt: 'Elektrodiagnostik', text: 'ELEKTRODIAGNOSTIK' },
     { src: '/FrontEnd/Foto/usg.png', alt: 'USG', text: 'USG' },
    { src: '/FrontEnd/Foto/rontgen-kepala.png', alt: 'Rontgen Kepala & Leher', text: 'RONTGEN KEPALA & LEHER' },
    { src: '/FrontEnd/Foto/rontgen-gigi.png', alt: 'Rontgen Gigi', text: 'RONTGEN GIGI' },
    { src: '/FrontEnd/Foto/rontgen-anggota-gerak.png', alt: 'Rontgen Anggota Gerak', text: 'RONTGEN ANGGOTA GERAK' },
    { src: '/FrontEnd/Foto/rontgen-badan.png', alt: 'Rontgen Badan', text: 'RONTGEN BADAN' },
    { src: '/FrontEnd/Foto/layanan-klinik.png', alt: 'Layanan Klinik', text: 'LAYANAN KLINIK' }
];

const itemsPerPage = 12;
let currentIndex = 0;
let totalPages = Math.ceil(categories.length / itemsPerPage);

function createCategoryCard(category) {
    const card = document.createElement('div');
    card.classList.add('category-card');

    const img = document.createElement('img');
    img.src = category.src;
    img.alt = category.alt;

    const text = document.createElement('p');
    text.textContent = category.text;

    card.appendChild(img);
    card.appendChild(text);

    return card;
}

function createCarouselItem(startIndex) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    for (let i = startIndex; i < startIndex + itemsPerPage && i < categories.length; i++) {
        const card = createCategoryCard(categories[i]);
        carouselItem.appendChild(card);
    }
    return carouselItem;
}

function updateCarousel() {
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';

    for(let i = 0; i < totalPages; i++) {
        const carouselItem = createCarouselItem(i * itemsPerPage);
        carousel.appendChild(carouselItem);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        if(i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);

    }
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalPages - 1 : currentIndex - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalPages - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

updateCarousel();