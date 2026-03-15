// pages/games/game-c.js
// Jeu : Proverbes à Compléter
// Tire parti de la mémoire sémantique à long terme, préservée plus longtemps
// dans la maladie d'Alzheimer

var questions = [
    {
        debut:   'Mieux vaut tard que…',
        choices: ['jamais', 'tôt', 'tard'],
        correct: 0
    },
    {
        debut:   'Après la pluie,\nle beau…',
        choices: ['temps', 'jour', 'soleil'],
        correct: 0
    },
    {
        debut:   'Qui se ressemble…',
        choices: ['se ressemble', "s'assemble", 'se connaît'],
        correct: 1
    },
    {
        debut:   'Pierre qui roule\nn'amasse pas…',
        choices: ['mousse', 'terre', 'pierre'],
        correct: 0
    },
    {
        debut:   'Les bons comptes font\nles bons…',
        choices: ['calculs', 'marchés', 'amis'],
        correct: 2
    }
];

var currentIndex  = 0;
var answered      = false;

document.addEventListener('DOMContentLoaded', function () {
    var proverbText  = document.getElementById('proverb-text');
    var counter      = document.getElementById('question-counter');
    var choiceBtns   = document.querySelectorAll('.choice-btn');
    var feedbackEl   = document.getElementById('feedback');
    var btnPasser    = document.getElementById('btn-passer');

    // Démarrer le chrono de session
    if (!sessionStorage.getItem('mc_sessionStart')) {
        sessionStorage.setItem('mc_sessionStart', Date.now());
    }

    function loadQuestion(index) {
        if (index >= questions.length) {
            // Fin des questions → écran de fin
            window.location.href = 'game-end.html';
            return;
        }

        var q = questions[index];
        answered = false;

        // Texte du proverbe
        proverbText.textContent = q.debut;

        // Compteur
        counter.textContent = 'Question ' + (index + 1) + ' sur ' + questions.length;

        // Choix
        choiceBtns.forEach(function (btn, i) {
            btn.textContent = '…' + q.choices[i];
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
        });

        // Cacher le feedback
        feedbackEl.hidden = true;
    }

    choiceBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (answered) return;
            answered = true;

            var chosen  = parseInt(this.dataset.index);
            var correct = questions[currentIndex].correct;

            // Désactiver tous les boutons
            choiceBtns.forEach(function (b) { b.disabled = true; });

            if (chosen === correct) {
                this.classList.add('correct');
                showFeedback('Exactement ! Vous vous en souvenez très bien. 🌿');
            } else {
                this.classList.add('wrong');
                choiceBtns[correct].classList.add('correct');
                showFeedback('Pas tout à fait… mais c\'est normal. 🌿');
            }

            // Passer à la question suivante après un délai
            setTimeout(function () {
                currentIndex++;
                loadQuestion(currentIndex);
            }, 2200);
        });
    });

    btnPasser && btnPasser.addEventListener('click', function () {
        if (answered) return;
        currentIndex++;
        loadQuestion(currentIndex);
    });

    function showFeedback(msg) {
        feedbackEl.textContent = msg;
        feedbackEl.hidden = false;
    }

    // Charger la première question
    loadQuestion(0);
});
