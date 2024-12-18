const carousel = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const dotsContainer = document.querySelector('.dots-container');
const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');
const profilePasienNama = document.getElementById('nama-pasien')
const profilePasienAlamat = document.getElementById('alamat-pasien')
const profilePasienNoTelp = document.getElementById('noTelp-pasien')
const profilePasienLogout = document.getElementById('logout-pasien')

const apiUrl = 'http://localhost:8080'



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



async function fetchPaketData() {
    try {
        const response = await fetch(`${apiUrl}/api/paket/getAllJenisPemeriksaan`);
        if (!response.ok) {
            throw new Error('Network response paket was not ok ' + response.statusText);
        }

        const categories = await response.json();
        console.log(categories)
        const itemsPerPage = 12;
        let currentIndex = 0;
        let totalPages = Math.ceil(categories.length / itemsPerPage);

        function createCategoryCard(category) {
            const card = document.createElement('div');
            card.classList.add('category-card');

            const text = document.createElement('p');
            text.textContent = category;

            card.appendChild(text);

            card.addEventListener('click', () => {
                console.log(text.innerHTML)
                window.location.href = `/FrontEnd/Pasien-paket2.html?kategori=${text.innerHTML}`
            })

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

        function updateCarousel() {
            carousel.innerHTML = '';
            dotsContainer.innerHTML = '';

            for (let i = 0; i < totalPages; i++) {
                const carouselItem = createCarouselItem(i * itemsPerPage);
                carousel.appendChild(carouselItem);

                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);

            }
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        updateCarousel();


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

document.addEventListener('DOMContentLoaded', fetchPaketData);