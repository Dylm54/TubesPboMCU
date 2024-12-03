document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const packageCards = document.querySelectorAll('.package-card');
    const modal = document.getElementById('packageModal');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.querySelector('.close');
    const detailButtons = document.querySelectorAll('.btn-detail');

    // Package details data
    const packageDetails = {
        'Paket Basic': {
            description: 'Paket pemeriksaan dasar untuk screening kesehatan umum',
            preparations: [
                'Puasa 10-12 jam sebelum pemeriksaan',
                'Membawa kartu identitas',
                'Mengenakan pakaian yang mudah diganti'
            ],
            examinations: {
                'Thorax': 'Pemeriksaan rontgen dada untuk screening paru-paru',
                'Gula Darah': 'Pemeriksaan kadar glukosa puasa dan 2 jam pp',
                'Urinalysis': 'Pemeriksaan laboratorium sampel urine lengkap'
            }
        },
        'Paket Premium': {
            description: 'Paket pemeriksaan menengah dengan cakupan lebih luas',
            preparations: [
                'Puasa 10-12 jam sebelum pemeriksaan',
                'Membawa kartu identitas',
                'Mengenakan pakaian yang mudah diganti',
                'Tidak mengkonsumsi alkohol 24 jam sebelum pemeriksaan'
            ],
            examinations: {
                'Thorax': 'Pemeriksaan rontgen dada digital untuk screening paru-paru',
                'USG Abdomen': 'Pemeriksaan organ dalam perut dengan USG',
                'Gula Darah': 'Pemeriksaan kadar glukosa puasa, 2 jam pp, dan HbA1c',
                'Urinalysis': 'Pemeriksaan laboratorium sampel urine lengkap dengan sedimen'
            }
        },
        'Paket Executive': {
            description: 'Paket pemeriksaan lengkap untuk screening kesehatan menyeluruh',
            preparations: [
                'Puasa 10-12 jam sebelum pemeriksaan',
                'Membawa kartu identitas',
                'Mengenakan pakaian yang mudah diganti',
                'Tidak mengkonsumsi alkohol 24 jam sebelum pemeriksaan',
                'Tidur cukup minimal 6 jam sebelum pemeriksaan'
            ],
            examinations: {
                'Thorax Digital': 'Pemeriksaan rontgen dada digital resolusi tinggi',
                'USG Abdomen Full': 'Pemeriksaan organ dalam perut menyeluruh dengan USG',
                'Gula Darah Lengkap': 'Profil diabetus mellitus lengkap termasuk insulin',
                'Urinalysis Lengkap': 'Pemeriksaan laboratorium urine lengkap dengan kultur',
                'EKG Jantung': 'Pemeriksaan aktivitas listrik jantung'
            }
        }
    };

    // Filter functionality
    function updatePackageVisibility() {
        const selectedCategories = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        packageCards.forEach(card => {
            const cardCategories = card.dataset.categories.split(',');
            const shouldShow = cardCategories.some(category => 
                selectedCategories.includes(category)
            );
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Add event listeners to checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePackageVisibility);
    });

    // Modal functionality
    function openModal(packageName) {
        const details = packageDetails[packageName];
        if (!details) return;

        let modalHTML = `
            <h3>${packageName}</h3>
            <p class="description">${details.description}</p>
            
            <h4>Persiapan Pemeriksaan:</h4>
            <ul class="preparations">
                ${details.preparations.map(prep => `<li>${prep}</li>`).join('')}
            </ul>
            
            <h4>Detail Pemeriksaan:</h4>
            <div class="examinations-detail">
                ${Object.entries(details.examinations).map(([name, desc]) => `
                    <div class="examination-item">
                        <strong>${name}</strong>
                        <p>${desc}</p>
                    </div>
                `).join('')}
            </div>
        `;

        modalContent.innerHTML = modalHTML;
        modal.style.display = 'block';
    }

    // Add event listeners for detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageName = button.parentElement.querySelector('h3').textContent;
            openModal(packageName);
        });
    });

    // Close modal functionality
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Make navigation menu interactive
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Only prevent default if it's not linking to another page
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
            }
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Add keyboard support for modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Initialize with all packages visible
    updatePackageVisibility();
});