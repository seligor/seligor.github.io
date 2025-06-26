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
