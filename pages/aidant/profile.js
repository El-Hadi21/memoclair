// pages/aidant/profile.js

document.addEventListener('DOMContentLoaded', function () {

    /* ── Oui / Non toggles ── */
    document.querySelectorAll('.oui-non-group').forEach(function (group) {
        const btns   = group.querySelectorAll('.oui-non-btn');
        const hidden = group.nextElementSibling; // <input type="hidden">

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (hidden) hidden.value = this.dataset.value;
            });
        });
    });

    /* ── Chips multi-sélection ── */
    const chips       = document.querySelectorAll('.chip');
    const themesInput = document.getElementById('themes-input');
    const chipsHint   = document.getElementById('chips-hint');

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            this.classList.toggle('active');
            updateThemes();
        });
    });

    function updateThemes() {
        const selected = [...chips]
            .filter(c => c.classList.contains('active'))
            .map(c => c.dataset.value);
        if (themesInput) themesInput.value = selected.join(',');
        if (chipsHint) {
            const n = selected.length;
            chipsHint.textContent = n > 0
                ? `${n} thème${n > 1 ? 's' : ''} sélectionné${n > 1 ? 's' : ''}`
                : 'Aucun thème sélectionné';
        }
    }

    /* ── Slider durée ── */
    const slider    = document.getElementById('duree-slider');
    const sliderVal = document.getElementById('slider-value');

    if (slider && sliderVal) {
        slider.addEventListener('input', function () {
            sliderVal.textContent = this.value + ' min';
        });
    }

    /* ── Soumission ── */
    const form       = document.getElementById('profile-form');
    const btnSave    = document.getElementById('btn-save');
    const saveMsg    = document.getElementById('save-confirm');

    form && form.addEventListener('submit', function (e) {
        e.preventDefault();
        btnSave.textContent = '✓ Enregistré !';
        btnSave.classList.add('saved');

        if (saveMsg) saveMsg.hidden = false;

        setTimeout(function () {
            btnSave.textContent = 'Enregistrer le profil';
            btnSave.classList.remove('saved');
            if (saveMsg) saveMsg.hidden = true;
        }, 3000);
    });
});
