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
    const modal = document.getElementById('formModal');
    const btn = document.getElementById('openFormBtn');
    const span = document.getElementsByClassName('close-modal')[0];
    
    // Плавное открытие модального окна
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    });
    
    // Плавное закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }
    
    span.addEventListener('click', closeModal);
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие при нажатии Escape
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
