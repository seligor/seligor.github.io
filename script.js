// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Меню для мобильных
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Анимация гамбургера в крестик
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
});
// Ленивая загрузка видео
document.addEventListener('DOMContentLoaded', () => {
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const lazyLoadVideo = (video) => {
        video.setAttribute('src', video.getAttribute('data-src'));
        video.load();
        video.removeAttribute('data-src');
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoadVideo(entry.target);
                videoObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });
});

// Обработка модального окна формы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const modal = document.getElementById('formModal');
    const btn = document.getElementById('openFormBtn');
    const span = document.querySelector('.close-form'); // Используем querySelector для поиска по классу внутри модального окна

    // Функция для открытия модального окна
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
             // Добавляем обработчик клика вне формы для закрытия
            modal.addEventListener('click', outsideClickListener);
        }
    }

    // Функция для закрытия модального окна
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
            // Удаляем обработчик клика вне формы
             modal.removeEventListener('click', outsideClickListener);
        }
    }

     // Функция для обработки клика вне формы
    function outsideClickListener(event) {
        // Проверяем, является ли цель клика самим модальным окном (фоном)
        if (event.target === modal) {
            closeModal();
        }
    }


    // Проверяем, существуют ли элементы, прежде чем добавлять обработчики событий
    if (btn && modal && span) {
        // Когда пользователь нажимает на кнопку, открывается модальное окно
        btn.addEventListener('click', openModal);

        // Когда пользователь нажимает на <span> (x), закрывается модальное окно
        span.addEventListener('click', closeModal);

        // Когда пользователь нажимает на Esc, закрывается модальное окно
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Опционально: закрытие модального окна при клике вне его содержимого
        // Обработчик добавляется/удаляется внутри openModal/closeModal
    } else {
        console.error('Не удалось найти один или несколько элементов модального окна формы.');
    }
});
