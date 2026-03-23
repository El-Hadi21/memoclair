// pages/games/game-a.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BASE DE DONNÉES (Profils et Images Réelles) ---
    const profiles = {
        marcel: {
            name: "Marcel",
            stage: "Stade Avancé",
            instruction: "Quel objet va avec la tasse ?",
            choicesLayout: "choices-grid-2", // 2 Colonnes
            choices: [
                { label: "Soucoupe", file: "choix_soucoupe.png", isCorrect: true },
                { label: "Sousplat", file: "choix_sousplat.png", isCorrect: false }
            ]
        },
        jean: {
            name: "Jean",
            stage: "Stade Modéré",
            instruction: "Avec quoi sert-on le café ?",
            choicesLayout: "choices-grid-3", // 3 Colonnes
            choices: [
                { label: "Verre", file: "choix_verre.png", isCorrect: false },
                { label: "Soucoupe", file: "choix_soucoupe.png", isCorrect: true },
                { label: "Assiette", file: "choix_assiette.png", isCorrect: false }
            ]
        },
        paul: {
            name: "Paul",
            stage: "Stade Léger",
            instruction: "Quel objet utilise-t-on pour préparer cette boisson ?",
            choicesLayout: "choices-grid-4", // 4 Colonnes
            choices: [
                { label: "Cafetière", file: "choix_cafetiere.png", isCorrect: true },
                { label: "Bouilloire", file: "choix_bouilloire.png", isCorrect: false },
                { label: "Casserole", file: "choix_casserole.png", isCorrect: false },
                { label: "Poêle", file: "choix_poele.png", isCorrect: false }
            ]
        }
    };

    // --- 2. RÉCUPÉRATION DU PATIENT DANS L'URL ---
    const urlParams = new URLSearchParams(window.location.search);
    let activePatientId = urlParams.get('patient') || 'marcel'; // Marcel par défaut si pas de paramètre

    const statusEl = document.getElementById('patient-status');
    const instructionEl = document.getElementById('game-instruction');
    const choicesContainer = document.getElementById('choices-container');
    const feedbackEl = document.getElementById('feedback');

    // --- 3. FONCTION DE GÉNÉRATION ---
    function loadLevel(profileId) {
        const data = profiles[profileId];
        if (!data) return;

        // Cacher le feedback précédent
        feedbackEl.hidden = true;

        // Mettre à jour les infos et la consigne
        statusEl.textContent = `Patient : ${data.name} (${data.stage})`;
        instructionEl.textContent = data.instruction;

        // Vider le conteneur et appliquer le layout Grid
        choicesContainer.innerHTML = '';
        choicesContainer.className = 'choices'; // Reset
        choicesContainer.classList.add(data.choicesLayout);

        // Mélanger les choix
        const shuffledChoices = data.choices.sort(() => Math.random() - 0.5);

        shuffledChoices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.setAttribute('data-correct', choice.isCorrect);

            // On utilise une vraie image IMG au lieu d'un SVG
            btn.innerHTML = `
                <img src="../../assets/pictuers/game_daily/${choice.file}" alt="${choice.label}" class="choice-btn__img">
                <span class="choice-label">${choice.label}</span>
            `;

            // Clic
            btn.addEventListener('click', function() {
                if (document.querySelector('.choice-btn.correct-highlight')) return;

                const isCorrect = this.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    this.classList.add('correct-highlight');
                    showFeedback("Très bien ! C'est exactement ça. 🌿");
                } else {
                    document.querySelector('.choice-btn[data-correct="true"]').classList.add('correct-highlight');
                    showFeedback("D'accord, regardons ensemble : c'était plutôt ceci. 🌿");
                }

                // Fin de démo
                setTimeout(() => {
                    window.location.href = 'game-end.html';
                }, 3000);
            });

            choicesContainer.appendChild(btn);
        });
    }

    function showFeedback(msg) {
        feedbackEl.textContent = msg;
        feedbackEl.hidden = false;
    }

    // --- 4. CHARGEMENT INITIAL ---
    loadLevel(activePatientId);
});