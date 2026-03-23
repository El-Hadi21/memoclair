// pages/games/game-b.js

document.addEventListener('DOMContentLoaded', function () {
    const choices = document.querySelectorAll('.choice-btn');
    const feedback = document.getElementById('feedback');

    const MAX_Q = 3;
    let answered = 0;

    // Démarrer le chrono de session (utile pour les stats plus tard)
    if (!sessionStorage.getItem('mc_sessionStart')) {
        sessionStorage.setItem('mc_sessionStart', Date.now());
    }

    // Gestion des réponses
    choices.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Empêcher de cliquer plusieurs fois
            if (this.classList.contains('selected') || this.classList.contains('correct') || this.classList.contains('wrong')) {
                return;
            }

            choices.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));

            const isCorrect = this.dataset.correct === 'true';

            if (isCorrect) {
                this.classList.add('correct');
                // Feedback positif et bienveillant
                showFeedback('Très bien ! C\'est la bonne réponse. 🌿');
            } else {
                this.classList.add('wrong');
                // On met en surbrillance la bonne réponse sans humilier
                document.querySelector('[data-correct="true"]').classList.add('correct');
                showFeedback('D\'accord, regardons ensemble. C\'était plutôt ceci. 🌿');
            }

            answered++;

            // Passage à l'écran de fin après un court délai
            if (answered >= MAX_Q) {
                setTimeout(function () {
                    window.location.href = 'game-end.html';
                }, 2500); // 2.5 secondes pour laisser le temps de lire le feedback
            }
        });
    });

    function showFeedback(message) {
        feedback.textContent = message;
        feedback.hidden = false;
    }
});