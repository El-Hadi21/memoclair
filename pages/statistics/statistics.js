// pages/statistics/statistics.js

document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════════
       1. BASE DE DONNÉES MULTI-PATIENTS
    ════════════════════════════════════ */
    const allPatientsData = {
        'Jean': {
            semaine: {
                periodLabel: 'Semaine du 9 au 15 mars 2026',
                sessions: '5',
                sessionsTrend: '+2 vs période précédente',
                duree: '10',
                dureeTrend: 'par session',
                facilitation: 'Moyen',
                facilitationTrend: 'Encourageant',
                sparkline: [22, 18, 24, 10, 14, 8, 8],
                attentionWeeks: [8, 9, 10, 11],
                attentionNote: '✅ La durée d\'attention progresse régulièrement. Envisagez d\'augmenter à 15 min.',
                attentionBadge: '+3 min sur 4 semaines',
                sessionRows: [
                    { mood: '😊', game: 'Mémoire', date: '15 mars, 14h30', duration: '12 min' },
                    { mood: '😐', game: 'Associations', date: '12 mars, 15h00', duration: '14 min' }
                ]
            },
            mois: {
                periodLabel: 'Mars 2026',
                sessions: '18',
                sessionsTrend: '+4 vs fév.',
                duree: '11',
                dureeTrend: 'par session',
                facilitation: 'Élevé',
                facilitationTrend: 'Très bien',
                sparkline: [20, 16, 14, 10, 18, 12, 8],
                attentionWeeks: [7, 9, 10, 11],
                attentionNote: '✅ Progression stable sur le mois pour Jean.',
                attentionBadge: '+4 min sur le mois',
                sessionRows: [{ mood: '😊', game: 'Mémoire', date: '10 mars', duration: '11 min' }]
            },
            annee: {
                periodLabel: 'Année 2026',
                sessions: '94',
                sessionsTrend: '+11 vs 2025',
                duree: '9',
                dureeTrend: 'moyenne',
                facilitation: 'Moyen',
                facilitationTrend: 'Stable',
                sparkline: [24, 20, 18, 14, 22, 16, 10],
                attentionWeeks: [6, 7, 9, 11],
                attentionNote: '✅ Progression significative sur l\'année (+5 min).',
                attentionBadge: '+5 min sur l\'année',
                sessionRows: [{ mood: '😊', game: 'Multi-jeux', date: 'Janvier 2026', duration: '9 min' }]
            }
        },
        'Paul': {
            semaine: {
                periodLabel: 'Semaine du 9 au 15 mars 2026',
                sessions: '8',
                sessionsTrend: '+3 vs période précédente',
                duree: '15',
                dureeTrend: 'par session',
                facilitation: 'Élevé',
                facilitationTrend: 'Excellente forme',
                sparkline: [10, 20, 15, 25, 30, 20, 28],
                attentionWeeks: [12, 14, 14, 15],
                attentionNote: '🌟 Paul montre une concentration exceptionnelle cette semaine.',
                attentionBadge: '+2 min sur 4 semaines',
                sessionRows: [
                    { mood: '😇', game: 'Proverbes', date: '14 mars, 10h15', duration: '20 min' },
                    { mood: '😊', game: 'Musique', date: '11 mars, 16h00', duration: '15 min' }
                ]
            },
            mois: { /* Données Paul Mois... */ },
            annee: { /* Données Paul Année... */ }
        }
    };

    /* ════════════════════════════════════
       2. VARIABLES D'ÉTAT & NAVIGATION
    ════════════════════════════════════ */
    let currentPatient = localStorage.getItem('selectedPatient') || 'Jean';
    let currentPeriod = 'semaine';

    const periodBtns = document.querySelectorAll('.period-btn');

    periodBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            updateUI();
        });
    });

    // Écouter le changement de patient via la Navbar
    window.addEventListener('patientChanged', function() {
        currentPatient = localStorage.getItem('selectedPatient') || 'Jean';
        updateUI();
        loadNotes(); // Recharger les notes spécifiques au nouveau patient
    });

    /* ════════════════════════════════════
       3. MISE À JOUR DE L'INTERFACE
    ════════════════════════════════════ */
    function updateUI() {
        const patientData = allPatientsData[currentPatient] || allPatientsData['Jean'];
        const d = patientData[currentPeriod];

        // 1. Les textes de base (déjà fait)
        document.getElementById('patient-name').textContent = currentPatient;
        document.getElementById('period-label').textContent = d.periodLabel;

        // 2. Performance par jeu (Dynamique)
        const gameList = document.getElementById('game-perf-list');
        if (gameList && d.gameStats) {
            gameList.innerHTML = d.gameStats.map(g => `
            <div class="game-perf-row">
                <div class="game-perf-row__name"><span>${g.icon} ${g.name}</span></div>
                <div class="game-perf-row__bars">
                    <div class="bar-row">
                        <span class="bar-label">Complétion</span>
                        <div class="bar-track"><div class="bar-fill bar-fill--green" style="width: ${g.comp}%"></div></div>
                        <span class="bar-pct">${g.comp}%</span>
                    </div>
                </div>
            </div>
        `).join('');
        }

        // 3. Recommandations (Dynamique)
        const recoList = document.getElementById('reco-list');
        if (recoList && d.recoms) {
            recoList.innerHTML = d.recoms.map(r => `
            <li class="reco-item reco-item--${r.type}">
                <span class="reco-item__icon">${r.icon}</span>
                <div>
                    <p class="reco-item__title">${r.title}</p>
                    <p class="reco-item__desc">${r.desc}</p>
                </div>
            </li>
        `).join('');
        }

        // 4. Appel des fonctions graphiques existantes
        updateSparkline(d.sparkline);
        updateAttentionChart(d.attentionWeeks);
    }

    /* ════════════════════════════════════
       4. COMPOSANTS GRAPHIQUES (SVG)
    ════════════════════════════════════ */
    function updateSparkline(pts) {
        const line = document.getElementById('sparkline-line');
        const dot = document.getElementById('sparkline-dot');
        if (!line) return;

        const W = 80, H = 28;
        const max = Math.max(...pts), min = Math.min(...pts);
        const range = (max - min) || 1;

        const pointsStr = pts.map((v, i) => {
            const x = ((i / (pts.length - 1)) * W).toFixed(1);
            const y = (H - ((v - min) / range) * (H - 4) - 2).toFixed(1);
            return `${x},${y}`;
        }).join(' ');

        line.setAttribute('points', pointsStr);
        if (dot) {
            dot.setAttribute('cx', W);
            dot.setAttribute('cy', (H - ((pts[pts.length - 1] - min) / range) * (H - 4) - 2).toFixed(1));
        }
    }

    function updateAttentionChart(weeks) {
        const xs = [110, 220, 330, 440];
        const yMin = 125, yMax = 20, maxVal = 20;
        const toY = (v) => yMin - ((v / maxVal) * (yMin - yMax));

        const points = weeks.map((v, i) => `${xs[i]},${toY(v).toFixed(1)}`).join(' ');
        let areaD = `M${xs[0]},${toY(weeks[0]).toFixed(1)} `;
        for (let i = 1; i < weeks.length; i++) areaD += `L${xs[i]},${toY(weeks[i]).toFixed(1)} `;
        areaD += `L${xs[xs.length-1]},125 L${xs[0]},125 Z`;

        setAttr('attention-line', 'points', points);
        setAttr('attention-area', 'd', areaD);

        weeks.forEach((v, i) => {
            const y = toY(v);
            setAttr(`dot-s${i+1}`, 'cx', xs[i]);
            setAttr(`dot-s${i+1}`, 'cy', y.toFixed(1));
            setAttr(`label-s${i+1}`, 'x', xs[i]);
            setAttr(`label-s${i+1}`, 'y', (y - 8).toFixed(1));
            setText(`label-s${i+1}`, `${v} min`);
        });
    }

    function updateSessionsList(rows) {
        const list = document.getElementById('sessions-list');
        if (!list) return;
        list.innerHTML = rows.map(s => `
            <li class="session-row">
                <span class="session-mood">${s.mood}</span>
                <div class="session-info">
                    <p class="session-game">${s.game}</p>
                    <p class="session-date">${s.date}</p>
                </div>
                <span class="session-duration">${s.duration}</span>
            </li>
        `).join('');
    }

    /* ════════════════════════════════════
       5. GESTION DES NOTES (PAR PATIENT)
    ════════════════════════════════════ */
    const noteForm = document.getElementById('notes-form');
    const noteInput = document.getElementById('note-input');
    const notesList = document.getElementById('notes-list');

    function saveNote(text) {
        const storageKey = `notes_${currentPatient}`;
        const notes = JSON.parse(localStorage.getItem(storageKey) || "[]");
        notes.unshift({ text, date: new Date().toLocaleDateString('fr-FR') });
        localStorage.setItem(storageKey, JSON.stringify(notes));
        loadNotes();
    }

    function loadNotes() {
        if (!notesList) return;
        const storageKey = `notes_${currentPatient}`;
        const notes = JSON.parse(localStorage.getItem(storageKey) || "[]");
        notesList.innerHTML = notes.map((n, i) => `
            <li class="note-item">
                <div class="note-item__meta">
                    <span class="note-item__date">${n.date} – Aidant</span>
                    <button class="note-item__delete" data-index="${i}">×</button>
                </div>
                <p class="note-item__text">${n.text}</p>
            </li>
        `).join('');
    }

    if (noteForm) {
        noteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const text = noteInput.value.trim();
            if (text) {
                saveNote(text);
                noteInput.value = '';
            }
        });
    }

    /* ════════════════════════════════════
       6. UTILITAIRES & INITIALISATION
    ════════════════════════════════════ */
    function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val; }
    function setAttr(id, attr, val) { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

    updateUI();
    loadNotes();
});