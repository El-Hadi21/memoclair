const presets = {
    facile: { q: 10, r: 3, img: true, t: 10, desc: "Mode Facile : 10 questions, 3 choix, images incluses, 10s pour l'indice." },
    moyen: { q: 15, r: 4, img: false, t: 20, desc: "Mode Moyen : 15 questions, 4 choix, pas d'images, 20s pour l'indice." },
    difficile: { q: 20, r: 5, img: false, t: 30, desc: "Mode Difficile : 20 questions, 5 choix, pas d'images, 30s pour l'indice." }
};

function setPreset(mode, btn) {
    // UI : Update active button
    btn.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const panel = document.getElementById('custom-controls');
    const summary = document.getElementById('preset-summary');

    if (mode === 'custom') {
        panel.style.display = 'block';
        summary.style.display = 'none';
    } else {
        panel.style.display = 'none';
        summary.style.display = 'block';
        summary.innerHTML = `<strong>${presets[mode].desc}</strong>`;

        // Mise à jour des valeurs réelles (pour l'enregistrement futur)
        document.getElementById('questions').value = presets[mode].q;
        document.getElementById('reponses').value = presets[mode].r;
        document.getElementById('img-toggle').checked = presets[mode].img;
        document.getElementById('duration').value = presets[mode].t;
    }
}

function changeValue(id, delta) {
    const input = document.getElementById(id);
    let newVal = parseInt(input.value) + delta;
    if (newVal > 0 && newVal <= 50) input.value = newVal;
}

function updateFontSize(size, btn) {
    document.getElementById('preview-box').style.fontSize = size;
    btn.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function saveSettings() {
    // Logique de sauvegarde (localStorage ou API)
    alert("Paramètres enregistrés avec succès !");
}

// Init au chargement
window.addEventListener('DOMContentLoaded', () => {
    // On simule le clic sur "Facile" au départ
    setPreset('facile', document.querySelector('.chip.active'));
});


// Fonction pour rafraîchir les éléments de la page liés au patient
function updatePageForPatient(name) {
    const patientNameSpan = document.getElementById('patient-name');
    if (patientNameSpan) patientNameSpan.innerText = name;

    const previewBox = document.getElementById('preview-box');
    if (previewBox) previewBox.innerText = `Aperçu du texte pour ${name}`;
}

// Au chargement initial
window.addEventListener('DOMContentLoaded', () => {
    const initialPatient = localStorage.getItem('selectedPatient') || 'Marcel';
    updatePageForPatient(initialPatient);
});

// Écouter l'événement envoyé par la navbar
window.addEventListener('patientChanged', (e) => {
    updatePageForPatient(e.detail);
});