// pages/statistics/statistics.js

document.addEventListener('DOMContentLoaded', function () {

    // Données par période
    const data = {
        semaine: {
            sessions: '5',
            sessionsTrend: '+2 vs semaine dernière',
            duree: '10',
            dureeTrend: 'par session',
            facilitation: 'Moyen',
            facilitationTrend: 'Encourageant',
            sparkline: [22, 18, 24, 10, 14, 8, 8],
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '14 mars 2026, 10 h 15', duration: '8 min'  },
                { mood: '😐', game: 'Mémoire & Réminiscence',    date: '12 mars 2026, 15 h 00', duration: '14 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '11 mars 2026, 11 h 45', duration: '10 min' },
                { mood: '😐', game: 'Mémoire & Réminiscence',    date: '9 mars 2026, 16 h 20',  duration: '6 min'  },
            ],
        },
        mois: {
            sessions: '18',
            sessionsTrend: '+4 vs mois dernier',
            duree: '11',
            dureeTrend: 'par session',
            facilitation: 'Élevé',
            facilitationTrend: 'Très bien',
            sparkline: [20, 16, 22, 14, 10, 18, 12, 8, 14, 10, 6, 8],
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '14 mars 2026, 10 h 15', duration: '8 min'  },
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '10 mars 2026, 14 h 00', duration: '15 min' },
                { mood: '😐', game: 'Associations du Quotidien', date: '7 mars 2026,  11 h 30', duration: '9 min'  },
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '2 mars 2026,  15 h 45', duration: '11 min' },
            ],
        },
        annee: {
            sessions: '94',
            sessionsTrend: '+11 vs an dernier',
            duree: '9',
            dureeTrend: 'par session',
            facilitation: 'Moyen',
            facilitationTrend: 'Stable',
            sparkline: [24, 20, 18, 14, 22, 16, 10, 14, 8, 12, 8, 6],
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😐', game: 'Associations du Quotidien', date: '14 mars 2026, 10 h 15', duration: '8 min'  },
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '10 mars 2026, 14 h 00', duration: '15 min' },
                { mood: '😐', game: 'Associations du Quotidien', date: '7 mars 2026,  11 h 30', duration: '9 min'  },
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '2 mars 2026,  15 h 45', duration: '11 min' },
            ],
        },
    };

    const facilClasses = {
        'Faible': 'facilitation-badge--faible',
        'Moyen':  'facilitation-badge--moyen',
        'Élevé':  'facilitation-badge--eleve',
    };

    // Éléments DOM
    const periodBtns      = document.querySelectorAll('.period-btn');
    const valSessions     = document.getElementById('val-sessions');
    const trendSessions   = document.getElementById('trend-sessions');
    const valDuree        = document.getElementById('val-duree');
    const trendDuree      = document.getElementById('trend-duree');
    const facilBadge      = document.getElementById('facilitation-badge');
    const trendFacil      = document.getElementById('trend-facilitation');
    const sparklineLine   = document.getElementById('sparkline-line');
    const sessionsList    = document.getElementById('sessions-list');

    // Gestion de la période
    periodBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateUI(this.dataset.period);
        });
    });

    function updateUI(period) {
        const d = data[period] || data.semaine;

        // Valeurs numériques
        if (valSessions)   valSessions.textContent   = d.sessions;
        if (trendSessions) trendSessions.textContent = d.sessionsTrend;
        if (valDuree)      valDuree.innerHTML = d.duree + ' <span class="stat-unit">min</span>';
        if (trendDuree)    trendDuree.textContent = d.dureeTrend;

        // Badge facilitation
        if (facilBadge) {
            facilBadge.textContent = d.facilitation;
            facilBadge.className   = 'facilitation-badge ' + (facilClasses[d.facilitation] || facilClasses['Moyen']);
        }
        if (trendFacil) trendFacil.textContent = d.facilitationTrend;

        // Sparkline
        if (sparklineLine && d.sparkline) {
            const pts    = d.sparkline;
            const width  = 80;
            const height = 28;
            const max    = Math.max(...pts);
            const min    = Math.min(...pts);
            const range  = max - min || 1;
            const pointsStr = pts.map(function (v, i) {
                const x = ((i / (pts.length - 1)) * width).toFixed(1);
                const y = (height - ((v - min) / range) * (height - 4) - 2).toFixed(1);
                return x + ',' + y;
            }).join(' ');
            sparklineLine.setAttribute('points', pointsStr);

            // Mettre à jour le cercle final
            const lastY = (height - ((pts[pts.length-1] - min) / range) * (height - 4) - 2).toFixed(1);
            const dot   = sparklineLine.nextElementSibling;
            if (dot) {
                dot.setAttribute('cx', width);
                dot.setAttribute('cy', lastY);
            }
        }

        // Timeline sessions
        if (sessionsList) {
            sessionsList.innerHTML = d.sessionRows.map(function (s) {
                return `
                    <li class="session-row">
                        <span class="session-mood" aria-label="Humeur">${s.mood}</span>
                        <div class="session-info">
                            <p class="session-game">${s.game}</p>
                            <p class="session-date">${s.date}</p>
                        </div>
                        <span class="session-duration">${s.duration}</span>
                    </li>
                `;
            }).join('');
        }
    }

    // Initialisation
    updateUI('semaine');
});
