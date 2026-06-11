// Бургер-меню для мобильной версии
(function() {
    
    function initBurgerMenu() {
        const burgerBtn = document.getElementById('burgerBtn');
        const mobileNav = document.getElementById('mobileNav');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (!burgerBtn || !mobileNav || !menuOverlay) {
            console.warn('Элементы меню не найдены');
            return;
        }
        
        function toggleMenu() {
            burgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        function closeMenu() {
            if (mobileNav.classList.contains('active')) {
                burgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        menuOverlay.addEventListener('click', closeMenu);
        
        const mobileLinks = mobileNav.querySelectorAll('.nav-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMenu();
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBurgerMenu);
    } else {
        initBurgerMenu();
    }
})();

// ===== АКТИВАЦИЯ КНОПОК НАВИГАЦИИ ПРИ СКРОЛЛЕ =====
(function() {
    function initNavHighlight() {
        const sections = document.querySelectorAll('section');
        const navBtns = document.querySelectorAll('.nav-buttons .nav-btn');
        
        if (sections.length === 0 || navBtns.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navBtns.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('href') === `#${id}`) {
                            btn.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.4 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavHighlight);
    } else {
        initNavHighlight();
    }
})();

// ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ДЕСКТОПНЫХ КНОПОК =====
(function() {
    function initSmoothScroll() {
        const desktopLinks = document.querySelectorAll('.nav-buttons .nav-btn');
        
        desktopLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
    } else {
        initSmoothScroll();
    }
})();
