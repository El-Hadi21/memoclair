// pages/games/game-b.js

document.addEventListener('DOMContentLoaded', function () {
    const params       = new URLSearchParams(window.location.search);
    const isDuo        = params.get('duo') === '1' || sessionStorage.getItem('duoMode') === 'true';
    const duoBadge     = document.getElementById('duo-badge');
    const caregiverBar = document.getElementById('caregiver-strip');
    const choices      = document.querySelectorAll('.choice-btn');
    const feedback     = document.getElementById('feedback');
    const btnPass      = document.getElementById('btn-passer');

    // Afficher le badge + bandeau aidant si mode duo
    if (isDuo) {
        duoBadge     && (duoBadge.hidden     = false);
        caregiverBar && (caregiverBar.hidden = false);
    }

    // Rotation des conseils aidant
    const hints = [
        '"Laissez-lui le temps de se souvenir…"',
        '"Montrez la photo de plus près si besoin."',
        '"Souriez, votre calme l\'aide à se concentrer."',
        '"Vous pouvez répéter la question doucement."',
    ];
    const hintEl = document.getElementById('caregiver-hint');
    if (hintEl) hintEl.textContent = hints[Math.floor(Math.random() * hints.length)];

    const MAX_Q = 3;
    let answered = 0;

    // Démarrer le chrono de session
    if (!sessionStorage.getItem('mc_sessionStart')) {
        sessionStorage.setItem('mc_sessionStart', Date.now());
    }

    // Gestion des réponses
    choices.forEach(function (btn) {
        btn.addEventListener('click', function () {
            choices.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));

            const isCorrect = this.dataset.correct === 'true';

            if (isCorrect) {
                this.classList.add('correct');
                showFeedback('Très bien ! C\'est la bonne réponse. 🌿');
            } else {
                this.classList.add('wrong');
                document.querySelector('[data-correct="true"]').classList.add('correct');
                showFeedback('Pas tout à fait… voici la bonne réponse. 🌿');
            }

            answered++;
            if (answered >= MAX_Q) {
                setTimeout(function () {
                    window.location.href = 'game-end.html';
                }, 2000);
            }
        });
    });

    btnPass && btnPass.addEventListener('click', function () {
        choices.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));
        feedback.hidden = true;
        answered++;
        if (answered >= MAX_Q) {
            window.location.href = 'game-end.html';
        }
    });

    function showFeedback(message) {
        feedback.textContent = message;
        feedback.hidden = false;
    }
});
