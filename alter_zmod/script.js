function navigateTo(section) {
    // Здесь будет логика перехода к соответствующему разделу
    // Пока просто покажем сообщение в консоли
    console.log(`Переход к разделу: ${section}`);
    
    // В будущем можно реализовать так:
    // window.location.href = `${section}.html`;
    
    // Или для SPA:
    // loadSectionContent(section);
    
    // Временное сообщение для пользователя
    alert(`Раздел "${section}" будет открыт. В реальном сайте здесь будет переход к соответствующей странице.`);
}

// Дополнительные эффекты при наведении (опционально)
document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.icon');
            icon.style.transform = 'scale(1)';
        });
    });
});
