document.addEventListener('DOMContentLoaded', () => {
    
    // Gallery Data (Extended with requirements)
    const galleryData = [
        { src: 'image/lion.webp', category: 'mammals', title: 'Savanna King', desc: 'Sony A1 | 600mm | 1/1000s | f/4' },
        { src: 'image/tiger.webp', category: 'mammals', title: 'Jungle Ghost', desc: 'Sony A1 | 400mm | 1/800s | f/2.8' },
        { src: 'image/elephant.webp', category: 'mammals', title: 'Gentle Giants', desc: 'Sony A1 | 70-200mm | 1/500s | f/5.6' },
        { src: 'image/birds.webp', category: 'birds', title: 'Flight', desc: 'Sony A1 | 600mm | 1/3200s | f/4' },
        { src: 'image/marine life.webp', category: 'marine', title: 'Deep Blue', desc: 'Sony A1 | 16-35mm | 1/250s | f/8' },
        { src: 'image/macro wildlife.webp', category: 'macro', title: 'Micro Detail', desc: 'Sony A1 | 90mm Macro | 1/200s | f/11' },
        { src: 'image/black & white.webp', category: 'mammals', title: 'Monochrome Majesty', desc: 'Sony A1 | 400mm | 1/1000s | f/4' },
        { src: 'image/lion1.webp', category: 'mammals', title: 'Resting Lion', desc: 'Sony A1 | 600mm | 1/800s | f/4' },
        { src: 'image/tiger1.webp', category: 'mammals', title: 'Bengal Stare', desc: 'Sony A1 | 400mm | 1/1000s | f/2.8' },
        { src: 'image/elephant1.webp', category: 'mammals', title: 'Matriarch', desc: 'Sony A1 | 70-200mm | 1/400s | f/5.6' },
        { src: 'image/birds1.webp', category: 'birds', title: 'Eagle Eye', desc: 'Sony A1 | 600mm | 1/2000s | f/4' },
        { src: 'image/marine life1.webp', category: 'marine', title: 'Coral Reef', desc: 'Sony A1 | 16-35mm | 1/200s | f/8' },
        { src: 'image/macro wildlife1.webp', category: 'macro', title: 'Dew Drops', desc: 'Sony A1 | 90mm Macro | 1/160s | f/11' },
        { src: 'image/black & white1.webp', category: 'mammals', title: 'Shadows', desc: 'Sony A1 | 400mm | 1/800s | f/4' },
        { src: 'image/elephant2.webp', category: 'mammals', title: 'Dust Bath', desc: 'Sony A1 | 200mm | 1/1000s | f/5.6' },
        { src: 'image/birds2.webp', category: 'birds', title: 'Songbird', desc: 'Sony A1 | 600mm | 1/1000s | f/4' },
        { src: 'image/marine life2.webp', category: 'marine', title: 'Ocean Depths', desc: 'Sony A1 | 16-35mm | 1/320s | f/8' },
        { src: 'image/macro wildlife2.webp', category: 'macro', title: 'Leaf Veins', desc: 'Sony A1 | 90mm Macro | 1/250s | f/8' },
        { src: 'image/birds3.webp', category: 'birds', title: 'Morning Call', desc: 'Sony A1 | 400mm | 1/800s | f/5.6' },
        { src: 'image/asian wildlife.webp', category: 'mammals', title: 'Asian Tropics', desc: 'Sony A1 | 70-200mm | 1/500s | f/4' },
        { src: 'image/big cat.webp', category: 'mammals', title: 'Leopard Gaze', desc: 'Sony A1 | 600mm | 1/1000s | f/4' },
        { src: 'image/birds of prey.webp', category: 'birds', title: 'Raptor', desc: 'Sony A1 | 600mm | 1/2000s | f/4' },
        { src: 'image/african wildlife1.webp', category: 'mammals', title: 'Savanna Herd', desc: 'Sony A1 | 200mm | 1/800s | f/5.6' },
        { src: 'image/african wildlife2.webp', category: 'mammals', title: 'Grazing', desc: 'Sony A1 | 400mm | 1/1000s | f/4' },
        { src: 'image/asian wildlife1.webp', category: 'mammals', title: 'Jungle Explorer', desc: 'Sony A1 | 200mm | 1/500s | f/4' },
        { src: 'image/hippo.webp', category: 'mammals', title: 'River Giant', desc: 'Sony A1 | 400mm | 1/500s | f/5.6' },
        { src: 'image/black & white2.webp', category: 'mammals', title: 'Monochrome Texture', desc: 'Sony A1 | 200mm | 1/800s | f/5.6' },
        { src: 'image/macro wildlife2.webp', category: 'macro', title: 'Micro Details', desc: 'Sony A1 | 90mm Macro | 1/160s | f/11' },
        { src: 'image/v.webp', category: 'birds', title: 'Flight Pattern', desc: 'Sony A1 | 600mm | 1/2000s | f/4' },
        { src: 'image/c.webp', category: 'mammals', title: 'Curious Cub', desc: 'Sony A1 | 400mm | 1/500s | f/2.8' },
        { src: 'image/x.webp', category: 'marine', title: 'Shallows', desc: 'Sony A1 | 16-35mm | 1/200s | f/8' },
        { src: 'image/z.webp', category: 'birds', title: 'Feathers', desc: 'Sony A1 | 400mm | 1/1000s | f/5.6' }
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loader = document.getElementById('infinite-loader');
    
    let currentFilter = 'all';
    let loadedCount = 0;
    const itemsPerLoad = 8;
    let filteredData = [];

    // Parse URL for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('category');
    
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
    function initGallery(filter) {
        galleryContainer.innerHTML = '';
        loadedCount = 0;
        filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
        loadMoreItems();
    }

    function loadMoreItems() {
        if (loadedCount >= filteredData.length) {
            if(loader) loader.classList.remove('active');
            return; // All loaded
        }
        
        if(loader) loader.classList.add('active');

        // Simulate network delay for premium feel
        setTimeout(() => {
            const nextBatch = filteredData.slice(loadedCount, loadedCount + itemsPerLoad);
            
            nextBatch.forEach((item, index) => {
                const delay = (index % itemsPerLoad) * 0.1;
                const realIndex = galleryData.indexOf(item);
                
                const html = `
                    <div class="gallery-item" data-index="${realIndex}" style="animation-delay: ${delay}s">
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

            loadedCount += nextBatch.length;
            attachLightboxListeners();
            
            if (loadedCount >= filteredData.length) {
                if(loader) loader.classList.remove('active');
            }
        }, 800); // 800ms delay for animation
    }

    // Filter Click Events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('category', currentFilter);
            window.history.pushState({}, '', newUrl);

            initGallery(currentFilter);
        });
    });

    // Infinite Scroll Implementation
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            // Reached near bottom
            if (loadedCount < filteredData.length && (!loader || !loader.classList.contains('active'))) {
                loadMoreItems();
            }
        }
    });

    // Initial Render
    initGallery(currentFilter);

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
            // Remove existing to avoid duplicates if re-attaching
            const clone = item.cloneNode(true);
            item.parentNode.replaceChild(clone, item);
            
            clone.addEventListener('click', () => {
                currentViewData = filteredData;
                const realIndex = parseInt(clone.getAttribute('data-index'));
                const visibleIndex = currentViewData.findIndex(d => galleryData.indexOf(d) === realIndex);
                openLightbox(visibleIndex);
            });
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = ''; // Clear after fade out
        }, 500);
    }

    function updateLightboxContent() {
        const data = currentViewData[currentIndex];
        
        // Add subtle fade transition
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = data.src;
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = 1;
            };
            lightboxTitle.textContent = data.title;
            lightboxDesc.textContent = data.desc;
        }, 200);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentViewData.length;
        updateLightboxContent();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentViewData.length) % currentViewData.length;
        updateLightboxContent();
    }

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(nextBtn) nextBtn.addEventListener('click', nextImage);
    if(prevBtn) prevBtn.addEventListener('click', prevImage);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});
