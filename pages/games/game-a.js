// pages/games/game-a.js

document.addEventListener('DOMContentLoaded', function () {
    const choices   = document.querySelectorAll('.choice-btn');
    const feedback  = document.getElementById('feedback');
    const btnPass   = document.getElementById('btn-passer');
    const MAX_Q     = 3;   // nombre de questions avant l'écran de fin
    let   answered  = 0;

    // Démarrer le chrono de session
    if (!sessionStorage.getItem('mc_sessionStart')) {
        sessionStorage.setItem('mc_sessionStart', Date.now());
    }

    choices.forEach(function (btn) {
        btn.addEventListener('click', function () {
            choices.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));

            const isCorrect = this.dataset.correct === 'true';

            if (isCorrect) {
                this.classList.add('correct');
                showFeedback('Bravo ! C\'est la bonne réponse. 🌿');
            } else {
                this.classList.add('wrong');
                document.querySelector('[data-correct="true"]').classList.add('correct');
                showFeedback('Essayons encore… voici la bonne réponse. 🌿');
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
