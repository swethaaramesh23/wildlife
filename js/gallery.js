document.addEventListener('DOMContentLoaded', () => {
    
    // Sample gallery data (in a real app, this would come from a backend)
    const galleryData = [
        { src: 'image/lion.webp', category: 'lions', title: 'Savanna King', desc: 'Sony A1 | 600mm | 1/1000s | f/4' },
        { src: 'image/tiger.webp', category: 'tigers', title: 'Jungle Ghost', desc: 'Sony A1 | 400mm | 1/800s | f/2.8' },
        { src: 'image/elephant.webp', category: 'elephants', title: 'Gentle Giants', desc: 'Sony A1 | 70-200mm | 1/500s | f/5.6' },
        { src: 'image/birds.webp', category: 'birds', title: 'Flight', desc: 'Sony A1 | 600mm | 1/3200s | f/4' },
        { src: 'image/marine life.webp', category: 'marine', title: 'Deep Blue', desc: 'Sony A1 | 16-35mm | 1/250s | f/8' },
        { src: 'image/macro wildlife.webp', category: 'macro', title: 'Micro Detail', desc: 'Sony A1 | 90mm Macro | 1/200s | f/11' },
        { src: 'image/black & white.webp', category: 'bw', title: 'Monochrome Majesty', desc: 'Sony A1 | 400mm | 1/1000s | f/4' },
        { src: 'image/lion1.webp', category: 'lions', title: 'Resting Lion', desc: 'Sony A1 | 600mm | 1/800s | f/4' },
        { src: 'image/tiger1.webp', category: 'tigers', title: 'Bengal Stare', desc: 'Sony A1 | 400mm | 1/1000s | f/2.8' },
        { src: 'image/elephant1.webp', category: 'elephants', title: 'Matriarch', desc: 'Sony A1 | 70-200mm | 1/400s | f/5.6' },
        { src: 'image/birds1.webp', category: 'birds', title: 'Eagle Eye', desc: 'Sony A1 | 600mm | 1/2000s | f/4' },
        { src: 'image/marine life1.webp', category: 'marine', title: 'Coral Reef', desc: 'Sony A1 | 16-35mm | 1/200s | f/8' },
        { src: 'image/macro wildlife1.webp', category: 'macro', title: 'Dew Drops', desc: 'Sony A1 | 90mm Macro | 1/160s | f/11' },
        { src: 'image/black & white1.webp', category: 'bw', title: 'Shadows', desc: 'Sony A1 | 400mm | 1/800s | f/4' },
        { src: 'image/elephant2.webp', category: 'elephants', title: 'Dust Bath', desc: 'Sony A1 | 200mm | 1/1000s | f/5.6' },
        { src: 'image/birds2.webp', category: 'birds', title: 'Songbird', desc: 'Sony A1 | 600mm | 1/1000s | f/4' }
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    // Parse URL for initial filter (e.g., from Portfolio page)
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('cat');
    
    if(initialFilter) {
        currentFilter = initialFilter;
        filterBtns.forEach(btn => {
            if(btn.getAttribute('data-filter') === initialFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Render Gallery Items
    function renderGallery(filter) {
        galleryContainer.innerHTML = '';
        const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
        
        filteredData.forEach((item, index) => {
            const delay = (index % 10) * 0.1; // Stagger animation
            
            const html = `
                <div class="gallery-item" data-index="${galleryData.indexOf(item)}" style="animation-delay: ${delay}s">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-info">
                            <h4>${item.title}</h4>
                            <p>${item.category}</p>
                        </div>
                    </div>
                </div>
            `;
            galleryContainer.insertAdjacentHTML('beforeend', html);
        });

        // Re-attach lightbox listeners
        attachLightboxListeners();
    }

    // Filter Click Events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            
            // Update URL without reloading
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('cat', currentFilter);
            window.history.pushState({}, '', newUrl);

            renderGallery(currentFilter);
        });
    });

    // Initial Render
    renderGallery(currentFilter);

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    let currentViewData = [];

    function attachLightboxListeners() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Determine current visible set
                currentViewData = currentFilter === 'all' ? galleryData : galleryData.filter(d => d.category === currentFilter);
                
                const realIndex = parseInt(item.getAttribute('data-index'));
                const visibleIndex = currentViewData.findIndex(d => galleryData.indexOf(d) === realIndex);
                
                openLightbox(visibleIndex);
            });
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxContent() {
        const data = currentViewData[currentIndex];
        lightboxImg.src = data.src;
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.desc;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentViewData.length;
        updateLightboxContent();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentViewData.length) % currentViewData.length;
        updateLightboxContent();
    }

    // Event Listeners for Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Load More (Simulation)
    const loadMoreBtn = document.getElementById('load-more');
    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            setTimeout(() => {
                // In reality, fetch more. Here just reset.
                loadMoreBtn.innerText = 'All Caught Up';
                loadMoreBtn.disabled = true;
            }, 1000);
        });
    }
});
