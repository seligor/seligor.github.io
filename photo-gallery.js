// photo-gallery.js
document.addEventListener('DOMContentLoaded', function() {
    const photoGrid = document.querySelector('.photo-grid');
    
    // Массив с данными о фотографиях
    const photos = [
        {
            filename: 'photo1.jpg',
            title: 'Название модели 1',
            time: '1 час 15 минут'
        },
        {
            filename: 'photo2.jpg',
            title: 'Название модели 2',
            time: '45 минут'
        },
        // Добавьте остальные фотографии
    ];

    // Создаем карточки для каждой фотографии
    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        
        photoCard.innerHTML = `
            <div class="photo-container">
                <img src="gallery/${photo.filename}" alt="${photo.title}">
            </div>
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>Время печати: ${photo.time}</p>
            </div>
        `;
        
        photoGrid.appendChild(photoCard);
    });
   photoCard.addEventListener('click', function() {
    showModal(photo);
});

function showModal(photo) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="gallery/${photo.filename}" alt="${photo.title}">
            <div class="modal-info">
                <h3>${photo.title}</h3>
                <p>Время печати: ${photo.time}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
} 
});
