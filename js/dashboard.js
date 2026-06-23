document.addEventListener('DOMContentLoaded', () => {
    
    // Sidebar Navigation Logic
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-target]');
    const views = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target') + '-view';
            
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            
            // Add active class to clicked link and corresponding view
            link.classList.add('active');
            const targetView = document.getElementById(targetId);
            if(targetView) {
                targetView.classList.add('active');
            }

            // Close sidebar on mobile
            if(window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Mobile Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.querySelector('.close-sidebar');

    if(openBtn && closeBtn && sidebar) {
        openBtn.addEventListener('click', () => sidebar.classList.add('open'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        // Simple delay for effect
        setTimeout(updateCount, 500);
    });

    // Chart.js Initialization
    const viewsCtx = document.getElementById('viewsChart');
    if(viewsCtx) {
        new Chart(viewsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Page Views',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#a0a0a0' } }
                },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a0a0' } },
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a0a0' } }
                }
            }
        });
    }

    const revenueCtx = document.getElementById('revenueChart');
    if(revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Prints', 'Expeditions', 'Workshops', 'Licensing'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [4500, 12000, 3500, 2000],
                    backgroundColor: [
                        'rgba(212, 175, 55, 0.8)',
                        'rgba(26, 54, 34, 0.8)',
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(160, 160, 160, 0.8)'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a0a0' } },
                    x: { grid: { display: false }, ticks: { color: '#a0a0a0' } }
                }
            }
        });
    }

    // Theme Toggle (Mockup interaction)
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            alert('Theme switching would toggle CSS variables in a full implementation.');
        });
    }
});
