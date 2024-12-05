document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const sectionTitle = document.getElementById('section-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked nav item and corresponding section
            item.classList.add('active');
            const sectionId = item.getAttribute('data-section');
            const activeSection = document.getElementById(sectionId);
            activeSection.classList.add('active');

            // Update section title
            sectionTitle.textContent = item.textContent.trim();
        });
    });

    // Rest of the previous JavaScript code remains the same...
    // (Include the entire previous script here)
    // The main changes are in the navigation handling at the top
});