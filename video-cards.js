// video-cards.js
document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.querySelector('.video-grid');
    
    const videos = [
        {
            embed: '8jmppmBDYRhiB2czthyuR1',
            title: 'Механизм выдавливания. Проект в разработке',
            time: '2 часа'
        },
        {
            embed: 'jBVsVtosyFz5wFLQTC3QJP',
            title: 'Магниты на холодильник "Звёздочки поведения"',
            time: '30 минут'
        },
        // Добавьте все остальные видео в этот массив
    ];

    videos.forEach(video => {
        videoGrid.innerHTML += `
            <div class="video-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%">
                    <iframe src="https://kinescope.io/embed/${video.embed}" 
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
                            frameborder="0" allowfullscreen 
                            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>Время печати: ${video.time}</p>
                </div>
            </div>
        `;
    });
});
