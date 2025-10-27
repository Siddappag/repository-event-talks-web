document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('search');
    let talks = [];

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talks = data;
            renderSchedule(talks);
        });

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        talksToRender.forEach(talk => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');

            const categories = talk.category.map(cat => `<span class="category">${cat}</span>`).join('');

            talkElement.innerHTML = `
                <div class="time">${talk.time}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div>${categories}</div>
            `;
            scheduleContainer.appendChild(talkElement);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talks.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });
});
