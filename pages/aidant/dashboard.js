document.addEventListener('DOMContentLoaded', function () {
    const patientsStats = {
        'Marcel': { time: '50 min', timeTrend: '+15% vs semaine dernière', game: 'Mémoire', gameSessions: '5 sessions' },
        'Paul': { time: '1h 20', timeTrend: '+30% vs semaine dernière', game: 'Quotidien', gameSessions: '8 sessions' },
        'Jean': { time: '25 min', timeTrend: '-10% vs semaine dernière', game: 'Musique', gameSessions: '2 sessions' }
    };

    function updateUI() {
        const patient = localStorage.getItem('selectedPatient') || 'Marcel';
        const data = patientsStats[patient] || patientsStats['Marcel'];

        document.getElementById('patient-name').textContent = patient;
        document.querySelectorAll('.current-patient-name').forEach(el => el.textContent = patient);

        const tCard = document.getElementById('stat-time');
        const gCard = document.getElementById('stat-game');

        if (tCard) {
            tCard.setAttribute('value', data.time);
            tCard.setAttribute('trend', data.timeTrend);
        }
        if (gCard) {
            gCard.setAttribute('value', data.game);
            gCard.setAttribute('trend', data.gameSessions);
        }
    }

    window.addEventListener('patientChanged', updateUI);
    updateUI();
});