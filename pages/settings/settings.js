// pages/settings/settings.js

document.addEventListener('DOMContentLoaded', function () {
    var html          = document.documentElement;
    var fontBtns      = document.querySelectorAll('.font-size-btn');
    var contrastToggle= document.getElementById('contrast-toggle');
    var contrastLabel = document.querySelector('.contrast-row__label');

    /* ── Restaurer les préférences sauvegardées ── */
    var savedSize     = localStorage.getItem('mc_fontSize') || 'normal';
    var savedContrast = localStorage.getItem('mc_contrast') === 'true';

    // Marquer le bon bouton comme actif
    fontBtns.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.dataset.size === savedSize ? 'true' : 'false');
    });

    // Contraste
    contrastToggle.checked = savedContrast;
    updateContrastLabel(savedContrast);

    /* ── Changement taille de police ── */
    fontBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var size = this.dataset.size;

            // Mettre à jour les boutons
            fontBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
            this.setAttribute('aria-pressed', 'true');

            // Appliquer et sauvegarder
            html.setAttribute('data-font-size', size);
            localStorage.setItem('mc_fontSize', size);
        });
    });

    /* ── Changement contraste ── */
    contrastToggle.addEventListener('change', function () {
        var active = this.checked;

        if (active) {
            html.setAttribute('data-contrast', 'high');
        } else {
            html.removeAttribute('data-contrast');
        }

        localStorage.setItem('mc_contrast', active);
        updateContrastLabel(active);
    });

    function updateContrastLabel(active) {
        if (!contrastLabel) return;
        contrastLabel.textContent = active ? 'Activé' : 'Désactivé';
        contrastLabel.classList.toggle('active', active);
    }

    /* ── Retour : mémoriser la page d'origine ── */
    var btnBack = document.getElementById('btn-back');
    var origin  = sessionStorage.getItem('settings_origin');
    if (btnBack && origin) {
        btnBack.href = origin;
    }
});
