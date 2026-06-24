// Бургер-меню для мобильной версии
(function() {
    
    // Функция инициализации меню
    function initBurgerMenu() {
        console.log('Инициализация бургер-меню...');
        
        // Получаем элементы
        const burgerBtn = document.getElementById('burgerBtn');
        const mobileNav = document.getElementById('mobileNav');
        const menuOverlay = document.getElementById('menuOverlay');
        
        // Проверяем наличие элементов
        if (!burgerBtn) {
            console.error('❌ Кнопка меню #burgerBtn не найдена!');
            return false;
        }
        if (!mobileNav) {
            console.error('❌ Мобильное меню #mobileNav не найдено!');
            return false;
        }
        if (!menuOverlay) {
            console.error('❌ Оверлей #menuOverlay не найден!');
            return false;
        }
        
        console.log('✅ Все элементы найдены:', {
            burgerBtn: burgerBtn,
            mobileNav: mobileNav,
            menuOverlay: menuOverlay
        });
        
        // Получаем все ссылки в мобильном меню
        const mobileLinks = mobileNav.querySelectorAll('.nav-btn');
        console.log('Найдено ссылок в меню:', mobileLinks.length);
        
        // Функция открытия/закрытия меню
        function toggleMenu() {
            console.log('toggleMenu вызван');
            burgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                burgerBtn.innerHTML = '✕ Закрыть';
                console.log('Меню открыто');
            } else {
                document.body.style.overflow = '';
                burgerBtn.innerHTML = '☰ Меню';
                console.log('Меню закрыто');
            }
        }
        
        // Функция закрытия меню
        function closeMenu() {
            if (mobileNav.classList.contains('active')) {
                burgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                burgerBtn.innerHTML = '☰ Меню';
                console.log('Меню закрыто через closeMenu');
            }
        }
        
        // Удаляем старые обработчики, если есть
        const newBurgerBtn = burgerBtn.cloneNode(true);
        burgerBtn.parentNode.replaceChild(newBurgerBtn, burgerBtn);
        
        // Назначаем новый обработчик
        newBurgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Клик по кнопке меню!');
            toggleMenu();
        });
        
        // Обработчик на оверлей
        menuOverlay.addEventListener('click', function(e) {
            console.log('Клик по оверлею');
            closeMenu();
        });
        
        // Обработчики на ссылки
        mobileLinks.forEach((link, index) => {
            // Удаляем старые обработчики
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                console.log('Клик по ссылке меню:', this.getAttribute('href'));
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
        
        return true;
    }
    
    // Запускаем после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBurgerMenu);
    } else {
        // DOM уже загружен
        initBurgerMenu();
    }
    
    // Также запускаем через небольшую задержку (на всякий случай)
    setTimeout(function() {
        if (!document.getElementById('burgerBtn').__initDone) {
            initBurgerMenu();
        }
    }, 100);
    
})();