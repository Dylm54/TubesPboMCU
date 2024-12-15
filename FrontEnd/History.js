const dropdown = document.querySelector('.user-info .dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

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