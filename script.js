document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем меню на мобильных после клика
                    if (navLinks && navLinks.classList.contains('active')) {
                        menuToggle.click();
                    }
                }
            }
        });
    });

    // Ленивая загрузка медиа
    const lazyLoadMedia = () => {
        const lazyMedia = document.querySelectorAll('[data-src]');
        
        if ('IntersectionObserver' in window) {
            const mediaObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const media = entry.target;
                        if (media.tagName === 'VIDEO') {
                            media.src = media.dataset.src;
                        } else if (media.tagName === 'IMG') {
                            media.src = media.dataset.src;
                            media.removeAttribute('data-src');
                        }
                        media.load && media.load();
                        observer.unobserve(media);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });

            lazyMedia.forEach(media => mediaObserver.observe(media));
        } else {
            // Fallback для браузеров без поддержки IntersectionObserver
            lazyMedia.forEach(media => {
                if (media.tagName === 'VIDEO') {
                    media.src = media.dataset.src;
                } else if (media.tagName === 'IMG') {
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                }
                media.load && media.load();
            });
        }
    };

    // Инициализация ленивой загрузки
    lazyLoadMedia();

    // Модальное окно формы
    const modal = document.getElementById('formModal');
    const btn = document.getElementById('openFormBtn');
    const span = document.querySelector('.close-form');

    if (modal && btn && span) {
        const openModal = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            modal.setAttribute('aria-hidden', 'false');
            // Фокусируемся на первом элементе формы
            setTimeout(() => {
                const iframe = modal.querySelector('iframe');
                iframe && iframe.focus();
            }, 100);
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modal.setAttribute('aria-hidden', 'true');
        };

        btn.addEventListener('click', openModal);
        span.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                closeModal();
            }
        });
    }

    // Обработка ошибок загрузки медиа
    document.addEventListener('error', function(e) {
        const target = e.target;
        if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
            console.error('Ошибка загрузки медиа:', target.src || target.dataset.src);
            target.style.display = 'none';
        }
    }, true);
});

// Регистрация Service Worker для оффлайн-работы
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
