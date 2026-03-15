// pages/statistics/statistics.js

// Gestion du sélecteur de période
document.addEventListener('DOMContentLoaded', function() {

    // Sélecteur de période
    const periodButtons = document.querySelectorAll('.period-btn');

    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            periodButtons.forEach(btn => btn.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Mettre à jour les statistiques en fonction de la période
            updateStatistics(this.textContent.trim());
        });
    });

    // Animation des barres de progression au chargement
    animateProgressBars();
});

// Fonction pour mettre à jour les statistiques
function updateStatistics(period) {
    console.log('Période sélectionnée:', period);

    // Données fictives selon la période
    const data = {
        'Semaine': {
            tempsJeu: '2h 15m',
            sessions: '12',
            tauxReussite: '85%',
            scoreMoyen: '420',
            progression: '75%'
        },
        'Mois': {
            tempsJeu: '9h 45m',
            sessions: '48',
            tauxReussite: '82%',
            scoreMoyen: '405',
            progression: '70%'
        },
        'Année': {
            tempsJeu: '115h 30m',
            sessions: '580',
            tauxReussite: '78%',
            scoreMoyen: '385',
            progression: '65%'
        }
    };

    const currentData = data[period] || data['Semaine'];

    // Mettre à jour les valeurs dans les cartes
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        const title = card.querySelector('.stat-card__title')?.textContent;
        const valueElement = card.querySelector('.stat-card__value');

        if (valueElement) {
            switch(title) {
                case 'Temps de jeu':
                    valueElement.textContent = currentData.tempsJeu;
                    break;
                case 'Sessions':
                    valueElement.textContent = currentData.sessions;
                    break;
                case 'Taux de réussite':
                    valueElement.textContent = currentData.tauxReussite;
                    break;
                case 'Score moyen':
                    valueElement.textContent = currentData.scoreMoyen;
                    break;
            }
        }

        // Mettre à jour la barre de progression
        const progressFill = card.querySelector('.progress-bar__fill');
        if (progressFill) {
            progressFill.style.width = currentData.progression;
            const label = progressFill.querySelector('.progress-bar__label');
            if (label) {
                label.textContent = currentData.progression;
            }
        }
    });
}

// Animation des barres de progression
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar__fill');
    const gameBars = document.querySelectorAll('.game-bar__fill');

    // Animer avec un délai
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });

        gameBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 200);
}

// Export de données (fonctionnalité bonus)
function exportStatistics() {
    const stats = {
        period: document.querySelector('.period-btn.active').textContent,
        tempsJeu: document.querySelector('.stat-card:nth-child(2) .stat-card__value').textContent,
        sessions: document.querySelector('.stat-card:nth-child(3) .stat-card__value').textContent,
        tauxReussite: document.querySelector('.stat-card:nth-child(4) .stat-card__value').textContent,
        scoreMoyen: document.querySelector('.stat-card:nth-child(5) .stat-card__value').textContent,
        exportDate: new Date().toLocaleString('fr-FR')
    };

    console.log('Export des statistiques:', stats);
    alert('Statistiques exportées ! (Voir la console)');
}

