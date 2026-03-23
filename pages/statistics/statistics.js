// pages/statistics/statistics.js

document.addEventListener('DOMContentLoaded', () => {

    // Base de données simulée pour les 3 patients
    const patientsData = {
        marcel: [
            { id: 1, date: "Aujourd'hui, 10h15", duration: "12 min", games: "Réminiscence (Duo)", anxiety: "Apaisé", attStart: "60%", attMid: "80%", attEnd: "70%", comment: "Excellente réceptivité grâce aux photos de famille. Maintien de l'attention." },
            { id: 2, date: "Hier, 14h30", duration: "5 min", games: "Quotidien", anxiety: "Agité", attStart: "50%", attMid: "30%", attEnd: "10%", comment: "Session écourtée. Fatigue visible après le repas." }
        ],
        jean: [
            { id: 1, date: "Aujourd'hui, 09h00", duration: "15 min", games: "Quotidien", anxiety: "Calme", attStart: "80%", attMid: "75%", attEnd: "60%", comment: "Bonne concentration, légères difficultés sur la fin." }
        ],
        paul: [
            { id: 1, date: "Hier, 16h00", duration: "25 min", games: "Réminiscence + Quotidien", anxiety: "Très enthousiaste", attStart: "90%", attMid: "95%", attEnd: "85%", comment: "Très bonne session, forte implication." }
        ]
    };

    const patientSelect = document.getElementById('patient-select');
    const sessionsList = document.getElementById('sessions-list');

    // Éléments de détail
    const sessionTitle = document.getElementById('session-title');
    const mDuration = document.getElementById('metric-duration');
    const mGames = document.getElementById('metric-games');
    const mAnxiety = document.getElementById('metric-anxiety');
    const barStart = document.getElementById('bar-start');
    const barMid = document.getElementById('bar-mid');
    const barEnd = document.getElementById('bar-end');
    const comment = document.getElementById('attention-comment');

    function loadPatientStats(patientId) {
        const data = patientsData[patientId];
        sessionsList.innerHTML = ''; // On vide la liste

        data.forEach((session, index) => {
            const div = document.createElement('div');
            div.className = `session-item ${index === 0 ? 'active' : ''}`; // La première est active par défaut
            div.innerHTML = `
                <div class="session-date">${session.date}</div>
                <div class="session-preview">Durée : ${session.duration}</div>
            `;

            div.addEventListener('click', () => {
                // Gérer le visuel actif
                document.querySelectorAll('.session-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                displaySessionDetails(session);
            });

            sessionsList.appendChild(div);
        });

        // Afficher les détails de la première session par défaut
        if(data.length > 0) displaySessionDetails(data[0]);
    }

    function displaySessionDetails(session) {
        sessionTitle.textContent = `Détails de la session : ${session.date}`;
        mDuration.textContent = session.duration;
        mGames.textContent = session.games;
        mAnxiety.textContent = session.anxiety;

        // Animer le graphe d'attention
        barStart.style.height = session.attStart;
        barMid.style.height = session.attMid;
        barEnd.style.height = session.attEnd;

        // Couleur selon l'attention (rouge si chute d'attention)
        const isLow = parseInt(session.attEnd) < 40;
        const color = isLow ? '#F87171' : '#A8C4A2';
        barStart.style.backgroundColor = color;
        barMid.style.backgroundColor = color;
        barEnd.style.backgroundColor = color;

        comment.textContent = `Observation soignant : "${session.comment}"`;
    }

    // Changement de patient
    patientSelect.addEventListener('change', (e) => {
        loadPatientStats(e.target.value);
    });

    // Chargement initial
    loadPatientStats('marcel');
});