// pages/aidant/media.js

document.addEventListener('DOMContentLoaded', function () {
    const dropzone    = document.getElementById('dropzone');
    const fileInput   = document.getElementById('file-input');
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryEmpty= document.getElementById('gallery-empty');
    const galleryCount= document.getElementById('gallery-count');
    const progressWrap= document.getElementById('upload-progress');
    const progressFill= document.getElementById('progress-fill');
    const progressText= document.getElementById('progress-text');

    /* ── Drag & drop ── */
    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', function () {
        this.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        simulateUpload(e.dataTransfer.files);
    });

    /* ── Input fichier ── */
    fileInput.addEventListener('change', function () {
        simulateUpload(this.files);
        this.value = ''; // reset pour permettre le même fichier
    });

    /* ── Suppression de vignette ── */
    galleryGrid.addEventListener('click', function (e) {
        const removeBtn = e.target.closest('.thumb__remove');
        if (!removeBtn) return;
        const thumb = removeBtn.closest('.thumb');
        thumb.remove();
        updateCount();
    });

    /* ── Simulation d'upload avec barre de progression ── */
    function simulateUpload(files) {
        if (!files || files.length === 0) return;

        progressWrap.hidden = false;
        progressFill.style.width = '0%';

        let progress = 0;
        const interval = setInterval(function () {
            progress += Math.random() * 18 + 8;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressFill.style.width = '100%';
                progressText.textContent = 'Importé !';

                setTimeout(function () {
                    progressWrap.hidden = true;
                    progressText.textContent = 'Importation en cours…';
                    progressFill.style.width = '0%';

                    // Ajouter les vignettes
                    Array.from(files).forEach(addThumb);
                    updateCount();
                }, 800);
            } else {
                progressFill.style.width = progress + '%';
            }
        }, 80);
    }

    function addThumb(file) {
        const isAudio = file.type.startsWith('audio');
        const emoji   = isAudio ? '🎵' : '📷';
        const name    = file.name.replace(/\.[^.]+$/, '').slice(0, 20);

        const div = document.createElement('div');
        div.className = 'thumb' + (isAudio ? ' thumb--audio' : '');
        div.innerHTML = `
            <div class="thumb__media" aria-label="${name}">${emoji}</div>
            <p class="thumb__label">${name}</p>
            <button class="thumb__remove" aria-label="Supprimer ${name}" title="Supprimer">×</button>
        `;
        galleryGrid.appendChild(div);
    }

    function updateCount() {
        const thumbs = galleryGrid.querySelectorAll('.thumb');
        galleryCount.textContent = '(' + thumbs.length + ')';
        galleryEmpty.hidden = thumbs.length > 0;
    }
});
