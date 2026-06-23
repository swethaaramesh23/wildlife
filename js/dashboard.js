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
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            setTimeout(updateCount, 400);
        });
    };
    
    animateCounters();

    // Chart.js Premium Styling
    Chart.defaults.color = '#888';
    Chart.defaults.font.family = "'Inter', sans-serif";

    const viewsCtx = document.getElementById('viewsChart');
    if(viewsCtx) {
        // Create gradient for line chart
        const ctx = viewsCtx.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(203, 163, 88, 0.4)');
        gradient.addColorStop(1, 'rgba(203, 163, 88, 0.0)');

        new Chart(viewsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Portfolio Views',
                    data: [12000, 19000, 15000, 28000, 22000, 35000],
                    borderColor: '#cba358',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    pointBackgroundColor: '#050505',
                    pointBorderColor: '#cba358',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 12, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#cba358',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 15,
                        displayColors: false
                    }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: { padding: 10 }
                    },
                    x: { 
                        grid: { display: false, drawBorder: false },
                        ticks: { padding: 10 }
                    }
                }
            }
        });
    }

    const revenueCtx = document.getElementById('revenueChart');
    if(revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Prints', 'Tours', 'Workshops', 'Licensing'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [8500, 22000, 5500, 3200],
                    backgroundColor: [
                        'rgba(203, 163, 88, 0.9)',
                        'rgba(203, 163, 88, 0.6)',
                        'rgba(203, 163, 88, 0.4)',
                        'rgba(203, 163, 88, 0.2)'
                    ],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 12, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 15,
                        displayColors: false
                    }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: { padding: 10 }
                    },
                    x: { 
                        grid: { display: false, drawBorder: false },
                        ticks: { padding: 10 }
                    }
                }
            }
        });
    }
});
