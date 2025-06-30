// photo-gallery.js
document.addEventListener('DOMContentLoaded', function() {
    const photoGrid = document.querySelector('.photo-grid');
    
    // Массив с данными о фотографиях
    const photos = [
        {
            filename: 'project1.jpg',    // имя файла в папке gallery
            title: 'Механизм выдавливания', // название работы
            time: '2 часа',   // время печати
            material: 'PLA'           // материал (опционально)
        },
        {
            filename: 'project1-1.jpg',
            title: 'Механизм выдавливания',
            time: '2 часа',
            material: 'PLA'
        },
        {
            filename: 'rc-car_1to10.jpg',
            title: 'Детали RC модели',
            time: '2 часа',
            material: 'PETG'
        },
        {
            filename: 'wallclock.jpg',
            title: 'Настенные часы',
            time: '2 часа',
            material: 'PETG'
        },
        {
            filename: 'dozator_rotor.jpg',
            title: 'Разработка проекта из ротора\дозатора\коллектора\бункера',
            time: '2 часа',
            material: 'PETG'
        },
        {
            filename: 'mayak.jpg',
            title: 'Художественная фигурка Маяк',
            time: '2 часа',
            material: 'PETG'
        },
        {
            filename: 'vetryak.jpg',
            title: 'Проект "ветряк" - показывает направление и силу ветра',
            time: '6 часов',
            material: 'PETG'
        },
        {
            filename: 'catmask.jpg',
            title: 'Маска для котов',
            time: '5 часов',
            material: 'PETG'
        },




        // Добавьте остальные фотографии по такому же принципу
    ];

    // Функция для создания карточки фото
    function createPhotoCard(photo) {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        
        // Создаем HTML структуру карточки
        photoCard.innerHTML = `
            <div class="photo-container">
                <img src="gallery/${photo.filename}" alt="${photo.title}" loading="lazy">
            </div>
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>Время печати: ${photo.time}</p>
                ${photo.material ? `<p>Материал: ${photo.material}</p>` : ''}
            </div>
        `;
        
        // Добавляем обработчик клика для открытия модального окна
        photoCard.addEventListener('click', () => openModal(photo));
        
        return photoCard;
    }

    // Функция для открытия модального окна
    function openModal(photo) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="gallery/${photo.filename}" alt="${photo.title}">
                <div class="modal-info">
                    <h3>${photo.title}</h3>
                    <p>Время печати: ${photo.time}</p>
                    ${photo.material ? `<p>Материал: ${photo.material}</p>` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Закрытие модального окна
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Закрытие по клику вне изображения
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    // Добавляем все фотографии в галерею
    photos.forEach(photo => {
        const photoCard = createPhotoCard(photo);
        photoGrid.appendChild(photoCard);
    });

    // Опционально: можно добавить фильтрацию по материалам
    // Например, создать кнопки фильтрации над галереей
    const materials = [...new Set(photos.map(p => p.material).filter(Boolean))];
    if (materials.length > 1) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-material="all">Все материалы</button>
            ${materials.map(m => `<button class="filter-btn" data-material="${m}">${m}</button>`).join('')}
        `;
        
        photoGrid.parentNode.insertBefore(filterContainer, photoGrid);
        
        // Обработчики для кнопок фильтрации
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.filter-btn.active').classList.remove('active');
                this.classList.add('active');
                
                const material = this.dataset.material;
                document.querySelectorAll('.photo-card').forEach(card => {
                    if (material === 'all' || card.querySelector('p:last-child')?.textContent.includes(material)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
