// pages/games/games.js

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('duo-mode-toggle');
    const badge  = document.getElementById('duo-badge');
    const btnB   = document.getElementById('btn-jouer-b');

    if (!toggle) return;

    // Restore previous state
    const saved = sessionStorage.getItem('duoMode') === 'true';
    toggle.checked = saved;
    updateDuoBadge(saved);

    toggle.addEventListener('change', function () {
        sessionStorage.setItem('duoMode', this.checked);
        updateDuoBadge(this.checked);
    });

    function updateDuoBadge(active) {
        badge.textContent = active ? '👥 Aidant présent' : '';
        if (btnB) {
            btnB.href = active
                ? 'game-b.html?duo=1'
                : 'game-b.html';
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const duoToggle = document.getElementById('duo-mode-toggle');
    const btnJouerB = document.getElementById('btn-jouer-b');

    if (duoToggle && btnJouerB) {
        duoToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                // Si coché, on lance le vrai jeu Duo
                btnJouerB.href = "game-duo.html";
            } else {
                // Sinon, jeu solo classique
                btnJouerB.href = "game-b.html";
            }
        });
    }
});
