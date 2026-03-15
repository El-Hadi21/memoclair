// pages/games/game-end.js

document.addEventListener('DOMContentLoaded', function () {
    var startTime = sessionStorage.getItem('mc_sessionStart');
    var durationEl = document.getElementById('end-duration');
    var durationText = document.getElementById('duration-text');

    if (startTime && durationEl && durationText) {
        var elapsed = Math.round((Date.now() - parseInt(startTime)) / 60000);
        if (elapsed < 1) elapsed = 1;
        durationText.textContent = 'Session : ' + elapsed + ' min';
        durationEl.hidden = false;
    }

    // Nettoyer le sessionStorage de session
    sessionStorage.removeItem('mc_sessionStart');
    sessionStorage.removeItem('mc_questionCount');
});
