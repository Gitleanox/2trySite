document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header with Glassmorphism
    const header = document.querySelector('.glass-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Parallax Background Effect
    const parallaxLayers = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.15;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 3. Modal Mockup Logic
    const modal = document.getElementById('rdvModal');
    const openBtns = [document.getElementById('openModalBtnNav'), document.getElementById('openModalBtnHero')];
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');

    const openModal = () => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    };

    openBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Esc key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 4. Shop Horizontal Scroll Controls
    const shopScroll = document.getElementById('shopScroll');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (shopScroll && prevBtn && nextBtn) {
        const scrollAmount = 350; // Approximative width of a card + gap

        nextBtn.addEventListener('click', () => {
            shopScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            shopScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other open items
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');

            const isOpen = header.getAttribute('aria-expanded') === 'true';

            // Close all
            accordionHeaders.forEach(otherHeader => {
                otherHeader.setAttribute('aria-expanded', 'false');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked if it was closed
            if (!isOpen) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
