// pages/statistics/statistics.js

document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════════
       DONNÉES PAR PÉRIODE
    ════════════════════════════════════ */
    var data = {
        semaine: {
            periodLabel:       'Semaine du 9 au 15 mars 2026',
            sessions:          '5',
            sessionsTrend:     '+2 vs période précédente',
            duree:             '10',
            dureeTrend:        'par session',
            facilitation:      'Moyen',
            facilitationTrend: 'Encourageant',
            sparkline:         [22, 18, 24, 10, 14, 8, 8],
            attentionWeeks:    [8, 9, 10, 11],
            attentionNote:     '✅ La durée d\'attention progresse régulièrement. Envisagez d\'augmenter les sessions à <strong>15 min</strong> progressivement.',
            attentionBadge:    '+3 min sur 4 semaines',
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '14 mars 2026, 10 h 15', duration: '8 min'  },
                { mood: '😐', game: 'Mémoire & Réminiscence',    date: '12 mars 2026, 15 h 00', duration: '14 min' },
                { mood: '😊', game: 'Proverbes à Compléter',     date: '11 mars 2026, 13 h 45', duration: '10 min' },
                { mood: '😐', game: 'Associations du Quotidien', date: '9 mars 2026,  16 h 20',  duration: '6 min'  },
            ],
        },
        mois: {
            periodLabel:       'Mars 2026',
            sessions:          '18',
            sessionsTrend:     '+4 vs période précédente',
            duree:             '11',
            dureeTrend:        'par session',
            facilitation:      'Élevé',
            facilitationTrend: 'Très bien',
            sparkline:         [20, 16, 14, 10, 18, 12, 8],
            attentionWeeks:    [7, 9, 10, 11],
            attentionNote:     '✅ Progression stable sur le mois. La durée d\'attention est en hausse constante.',
            attentionBadge:    '+4 min sur le mois',
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '12 mars 2026, 10 h 15', duration: '9 min'  },
                { mood: '😊', game: 'Proverbes à Compléter',     date: '9 mars 2026,  13 h 45', duration: '11 min' },
                { mood: '😐', game: 'Mémoire & Réminiscence',    date: '5 mars 2026,  15 h 00', duration: '14 min' },
                { mood: '😊', game: 'Associations du Quotidien', date: '2 mars 2026,  11 h 30', duration: '8 min'  },
            ],
        },
        annee: {
            periodLabel:       'Année 2026',
            sessions:          '94',
            sessionsTrend:     '+11 vs période précédente',
            duree:             '9',
            dureeTrend:        'par session',
            facilitation:      'Moyen',
            facilitationTrend: 'Stable',
            sparkline:         [24, 20, 18, 14, 22, 16, 10],
            attentionWeeks:    [6, 7, 9, 11],
            attentionNote:     '✅ Progression significative sur l\'année (+5 min). La régularité des sessions explique cette amélioration.',
            attentionBadge:    '+5 min sur l\'année',
            sessionRows: [
                { mood: '😊', game: 'Mémoire & Réminiscence',    date: '15 mars 2026, 14 h 30', duration: '12 min' },
                { mood: '😐', game: 'Associations du Quotidien', date: '10 mars 2026, 10 h 15', duration: '8 min'  },
                { mood: '😊', game: 'Proverbes à Compléter',     date: '5 mars 2026,  13 h 45', duration: '11 min' },
                { mood: '😐', game: 'Mémoire & Réminiscence',    date: '28 fév. 2026, 15 h 00', duration: '7 min'  },
                { mood: '😊', game: 'Associations du Quotidien', date: '22 fév. 2026, 11 h 30', duration: '9 min'  },
            ],
        },
    };

    /* Styles du badge facilitation */
    var facilClasses = {
        'Faible': 'facilitation-badge--faible',
        'Moyen':  'facilitation-badge--moyen',
        'Élevé':  'facilitation-badge--eleve',
    };

    /* ════════════════════════════════════
       SÉLECTEUR DE PÉRIODE
    ════════════════════════════════════ */
    var periodBtns = document.querySelectorAll('.period-btn');

    periodBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            periodBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            updateUI(this.dataset.period);
        });
    });

    /* ════════════════════════════════════
       MISE À JOUR GLOBALE
    ════════════════════════════════════ */
    function updateUI(period) {
        var d = data[period] || data.semaine;

        /* -- Entête -- */
        setText('period-label', d.periodLabel);

        /* -- Cartes résumé -- */
        setText('val-sessions',      d.sessions);
        setText('trend-sessions',    d.sessionsTrend);
        setHTML('val-duree',         d.duree + ' <span class="stat-unit">min</span>');
        setText('trend-duree',       d.dureeTrend);
        setText('trend-facilitation',d.facilitationTrend);

        var badge = document.getElementById('facilitation-badge');
        if (badge) {
            badge.textContent = d.facilitation;
            badge.className   = 'facilitation-badge ' + (facilClasses[d.facilitation] || facilClasses['Moyen']);
        }

        /* -- Sparkline -- */
        updateSparkline(d.sparkline);

        /* -- Graphique attention -- */
        updateAttentionChart(d.attentionWeeks);
        setHTML('attention-note',         d.attentionNote);
        setText('attention-trend-badge',  d.attentionBadge);

        /* -- Timeline sessions -- */
        updateSessionsList(d.sessionRows);
    }

    /* ════════════════════════════════════
       SPARKLINE
    ════════════════════════════════════ */
    function updateSparkline(pts) {
        var line = document.getElementById('sparkline-line');
        var dot  = document.getElementById('sparkline-dot');
        if (!line) return;

        var W = 80, H = 28;
        var max = Math.max.apply(null, pts);
        var min = Math.min.apply(null, pts);
        var range = max - min || 1;

        var pointsStr = pts.map(function (v, i) {
            var x = ((i / (pts.length - 1)) * W).toFixed(1);
            var y = (H - ((v - min) / range) * (H - 4) - 2).toFixed(1);
            return x + ',' + y;
        }).join(' ');

        line.setAttribute('points', pointsStr);

        if (dot) {
            var lastY = (H - ((pts[pts.length - 1] - min) / range) * (H - 4) - 2).toFixed(1);
            dot.setAttribute('cx', W);
            dot.setAttribute('cy', lastY);
        }
    }

    /* ════════════════════════════════════
       GRAPHIQUE ATTENTION (4 semaines)
    ════════════════════════════════════ */
    function updateAttentionChart(weeks) {
        // Positions X fixes pour les 4 semaines
        var xs    = [110, 220, 330, 440];
        // Échelle Y : 0 min → y=125, 20 min → y=20
        var yMin  = 125, yMax = 20, maxVal = 20;

        function toY(v) {
            return yMin - ((v / maxVal) * (yMin - yMax));
        }

        var points = weeks.map(function (v, i) {
            return xs[i] + ',' + toY(v).toFixed(1);
        }).join(' ');

        var areaD = 'M' + xs[0] + ',' + toY(weeks[0]).toFixed(1) + ' ';
        for (var i = 1; i < weeks.length; i++) {
            areaD += 'L' + xs[i] + ',' + toY(weeks[i]).toFixed(1) + ' ';
        }
        areaD += 'L' + xs[xs.length-1] + ',125 L' + xs[0] + ',125 Z';

        setAttr('attention-line',   'points', points);
        setAttr('attention-area',   'd',      areaD);

        // Labels et points
        weeks.forEach(function (v, i) {
            var y = toY(v);
            setAttr('dot-s'   + (i+1), 'cx', xs[i]);
            setAttr('dot-s'   + (i+1), 'cy', y.toFixed(1));
            setAttr('label-s' + (i+1), 'x',  xs[i]);
            setAttr('label-s' + (i+1), 'y',  (y - 8).toFixed(1));
            setText('label-s' + (i+1), v + ' min');
        });
    }

    /* ════════════════════════════════════
       TIMELINE SESSIONS
    ════════════════════════════════════ */
    function updateSessionsList(rows) {
        var list = document.getElementById('sessions-list');
        if (!list) return;

        list.innerHTML = rows.map(function (s) {
            return '<li class="session-row">'
                + '<span class="session-mood" aria-label="Humeur">' + s.mood + '</span>'
                + '<div class="session-info">'
                + '<p class="session-game">' + s.game + '</p>'
                + '<p class="session-date">' + s.date + '</p>'
                + '</div>'
                + '<span class="session-duration">' + s.duration + '</span>'
                + '</li>';
        }).join('');
    }

    /* ════════════════════════════════════
       NOTES DE L'AIDANT
    ════════════════════════════════════ */
    var noteForm    = document.getElementById('notes-form');
    var noteInput   = document.getElementById('note-input');
    var notesList   = document.getElementById('notes-list');
    var charCount   = document.getElementById('notes-char-count');

    if (noteInput && charCount) {
        noteInput.addEventListener('input', function () {
            charCount.textContent = this.value.length + ' / 400';
        });
    }

    if (noteForm) {
        noteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var text = noteInput.value.trim();
            if (!text) return;

            var now    = new Date();
            var dateStr = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

            var li = document.createElement('li');
            li.className = 'note-item';
            li.innerHTML = '<div class="note-item__meta">'
                + '<span class="note-item__date">' + dateStr + ' – Aidant</span>'
                + '<button class="note-item__delete" aria-label="Supprimer cette note" title="Supprimer">×</button>'
                + '</div>'
                + '<p class="note-item__text">' + escapeHtml(text) + '</p>';

            notesList.insertBefore(li, notesList.firstChild);

            noteInput.value = '';
            charCount.textContent = '0 / 400';
        });
    }

    // Suppression de note (délégation)
    if (notesList) {
        notesList.addEventListener('click', function (e) {
            var btn = e.target.closest('.note-item__delete');
            if (btn) btn.closest('.note-item').remove();
        });
    }

    /* ════════════════════════════════════
       UTILITAIRES
    ════════════════════════════════════ */
    function setText(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function setHTML(id, val) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = val;
    }

    function setAttr(id, attr, val) {
        var el = document.getElementById(id);
        if (el) el.setAttribute(attr, val);
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* ════════════════════════════════════
       INITIALISATION
    ════════════════════════════════════ */
    updateUI('semaine');
});
