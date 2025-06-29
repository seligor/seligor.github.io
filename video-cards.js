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
        {
            embed: '2Zww5jjAsppYyjJiY4WBaV',
            title: 'Игрушка для ребёнка "Планета Сатурн"',
            time: '1 час'
        },
        {
            embed: 'gXeYcjsnmgY1Thp8Weok9H',
            title: 'Детали для RC дрифт машинки 1:10',
            time: '1 час'
        },
        {
            embed: 'rHTsT2dzggrqjyuTpva3vS',
            title: 'Проект турбины для 775 мотора',
            time: '1 час'
        },
        {
            embed: 'nFG2kQryQT3opGRfhWYRjH',
            title: 'Проект турбины для 775 мотора',
            time: '40 минут'
        },
        {
            embed: 'kFd1rqAeznp48e4PiVcpFM',
            title: 'Проект турбины для 775 мотора',
            time: '4 часа'
        },
        {
            embed: '4Er8AT1mAFhTvXF8MW6Uaq',
            title: 'Вентиляция. Переходник со 110 трубы на вентилятор noktua',
            time: '40 минут'
        },
        {
            embed: 'xi5H5nxYTaFa4gqNXZBPxY',
            title: 'Ротор',
            time: '30 минут'
        },
        {
            embed: 'sxfcDHi53zGK33xTKyvqvr',
            title: 'Коллектор',
            time: '40 минут'
        },
        {
            embed: 'rr6DAYfHvg34CW3K2jZCaZ',
            title: 'Дозатор',
            time: '1 час 20 минут'
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
