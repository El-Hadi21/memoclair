// pages/games/game-duo.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURATION DES 3 MANCHES (Textes adaptés par joueur) ---
    const rounds = [
        {
            // Manche 1 : Photo classique
            mediaHtml: `
                <div class="photo-frame" role="img" aria-label="Photo personnelle">
                    <svg viewBox="0 0 280 200" style="height: 180px;">
                        <rect width="280" height="200" rx="16" fill="#EEF5EF"/>
                        <circle cx="240" cy="48" r="32" fill="#FAD07A" opacity="0.7"/>
                        <circle cx="140" cy="90" r="44" fill="#D4A96A"/>
                        <path d="M72 240 Q72 170 140 162 Q208 170 208 240 Z" fill="#A8C4A2"/>
                    </svg>
                </div>`,
            question: "Qui est sur cette photo avec vous ?",
            choicesAidant: ["Isabelle (Moi)", "Tante Hélène"],
            choicesAccueilli: ["Isabelle, ma fille", "Hélène, ma sœur"],
            feedbackAgree: "C'est bien Isabelle sur cette belle photo !"
        },
        {
            // Manche 2 : Audio de 20s (Charles Aznavour)
            mediaHtml: `
                <div class="audio-container">
                    <span style="font-size: 4rem;" aria-hidden="true">🎵</span>
                    <audio controls src="../../assets/audios/la-boheme.mp3"></audio>
                    <p class="audio-hint">(Extrait : Charles Aznavour - La Bohème)</p>
                </div>`,
            question: "C'est la musique préférée de qui ?",
            choicesAidant: ["La musique de papa", "Ma musique (Isabelle)"],
            choicesAccueilli: ["Ma musique (Marcel)", "La musique d'Isabelle"],
            feedbackAgree: "Exactement ! Vous l'écoutiez tout le temps en voiture."
        },
        {
            // Manche 3 : Photo Mariage
            mediaHtml: `
                <div class="photo-frame" role="img" aria-label="Photo de mariage">
                    <svg viewBox="0 0 280 200" style="height: 180px;">
                        <rect width="280" height="200" rx="16" fill="#FFF0F5"/>
                        <circle cx="100" cy="90" r="30" fill="#D4A96A"/>
                        <path d="M60 200 Q60 150 100 140 Q140 150 140 200 Z" fill="#333"/>
                        <circle cx="180" cy="95" r="25" fill="#FAD07A"/>
                        <path d="M140 200 Q140 160 180 150 Q220 160 220 200 Z" fill="#FFF"/>
                    </svg>
                </div>`,
            question: "C'est le mariage de qui ?",
            choicesAidant: ["Le mariage de papa", "Mon mariage"],
            choicesAccueilli: ["Mon mariage", "Le mariage d'Isabelle"],
            feedbackAgree: "Quel beau souvenir, c'était une journée magnifique !"
        }
    ];

    // --- 2. LOGIQUE DU JEU ---
    let currentRoundIndex = 0;
    let aidantChoice = null;
    let accueilliChoice = null;

    const mediaContainer = document.getElementById('media-container');
    const questionText = document.getElementById('question-text');
    const aidantButtons = document.querySelectorAll('#choices-aidant .choice-btn');
    const accueilliButtons = document.querySelectorAll('#choices-accueilli .choice-btn');
    const feedbackOverlay = document.getElementById('duo-feedback');
    const btnNext = document.getElementById('btn-next');

    // Fonction pour charger une manche à l'écran
    function loadRound(index) {
        const roundData = rounds[index];

        // Mettre à jour le média et la question
        mediaContainer.innerHTML = roundData.mediaHtml;
        questionText.textContent = roundData.question;

        // On injecte les textes spécifiques à l'Aidant
        aidantButtons[0].textContent = roundData.choicesAidant[0];
        aidantButtons[1].textContent = roundData.choicesAidant[1];

        // On injecte les textes spécifiques à l'Accueilli
        accueilliButtons[0].textContent = roundData.choicesAccueilli[0];
        accueilliButtons[1].textContent = roundData.choicesAccueilli[1];

        // Réinitialiser l'état des clics
        aidantChoice = null;
        accueilliChoice = null;
        document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        document.querySelectorAll('.waiting-msg').forEach(msg => msg.classList.add('hidden'));
        feedbackOverlay.classList.add('hidden');
    }

    // Gestion des clics sur les boutons
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const player = this.getAttribute('data-player');
            const choiceIndex = this.getAttribute('data-index');

            // Visuel : bouton sélectionné
            document.querySelectorAll(`.choice-btn[data-player="${player}"]`).forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');

            // Enregistrer le choix
            if (player === 'aidant') {
                aidantChoice = choiceIndex;
                document.getElementById('wait-aidant').classList.remove('hidden');
            } else {
                accueilliChoice = choiceIndex;
                document.getElementById('wait-accueilli').classList.remove('hidden');
            }

            // Si les deux ont joué -> Résultat
            if (aidantChoice !== null && accueilliChoice !== null) {
                setTimeout(showFeedback, 600);
            }
        });
    });

    // Afficher la discussion (le pop-up de résultat)
    function showFeedback() {
        const roundData = rounds[currentRoundIndex];

        if (aidantChoice === accueilliChoice) {
            document.getElementById('feedback-icon').textContent = "🎉";
            document.getElementById('feedback-message').textContent = "On est d'accord !";
            document.getElementById('feedback-submessage').textContent = roundData.feedbackAgree;
        } else {
            document.getElementById('feedback-icon').textContent = "💬";
            document.getElementById('feedback-message').textContent = "Ah ! On en discute ?";
            document.getElementById('feedback-submessage').textContent = "Vous avez des souvenirs différents, profitez-en pour en parler !";
        }

        // Adapter le texte du bouton si c'est la dernière question
        if (currentRoundIndex === rounds.length - 1) {
            btnNext.textContent = "Terminer le jeu";
        } else {
            btnNext.textContent = "Passer au souvenir suivant";
        }

        feedbackOverlay.classList.remove('hidden');
    }

    // Bouton pour avancer dans le jeu
    btnNext.addEventListener('click', () => {
        currentRoundIndex++;

        if (currentRoundIndex < rounds.length) {
            loadRound(currentRoundIndex); // Manche suivante
        } else {
            window.location.href = 'game-end.html'; // Fin du jeu
        }
    });

    // --- 3. LANCEMENT INITIAL ---
    loadRound(0);
});