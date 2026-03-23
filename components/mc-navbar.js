/**
 * <mc-navbar active="dashboard" dir="aidant">
 * active : dashboard | profile | media | statistics
 * dir    : aidant | statistics  (controls relative paths)
 */
class McNavbar extends HTMLElement {
    static get observedAttributes() { return ['active', 'dir']; }

    connectedCallback() { this._render(); }
    attributeChangedCallback() { this._render(); }

    _render() {
        const active = this.getAttribute('active') || 'dashboard';
        const dir    = this.getAttribute('dir')    || 'aidant';

        const isStats  = dir === 'statistics';
        const prefix   = isStats ? '../aidant/' : '';
        const statsHref = isStats ? 'statistics.html' : '../statistics/statistics.html';
        const homeHref  = '../index/index.html';

        // Récupération du patient actuel pour que le select affiche le bon nom au chargement
        const currentPatient = localStorage.getItem('selectedPatient') || 'Jean';

        const links = [
            { key: 'dashboard',  href: prefix + 'dashboard.html', label: 'Tableau de bord' },
            { key: 'profile',    href: prefix + 'profile.html',   label: 'Profil'          },
            { key: 'media',      href: prefix + 'media.html',     label: 'Médias'          },
            { key: 'statistics', href: statsHref,                  label: 'Statistiques'    },
            { key: 'logout',     href: homeHref,                   label: 'Déconnexion', logout: true },
        ];

        this.innerHTML = `
<nav class="navbar">
    <div class="navbar__logo">MemoClair</div>
    
    <div class="navbar__center">
        <select id="patient-selector" class="patient-select">
            <option value="Marcel" ${currentPatient === 'Marcel' ? 'selected' : ''}>Marcel</option>
            <option value="Paul" ${currentPatient === 'Paul' ? 'selected' : ''}>Paul</option>
            <option value="Jean" ${currentPatient === 'Jean' ? 'selected' : ''}>Jean</option>
        </select>
    </div>

    <div class="navbar__links">
        ${links.map(l =>
            `<a href="${l.href}" class="nav-item${l.key === active ? ' active' : ''}${l.logout ? ' btn-logout' : ''}">${l.label}</a>`
        ).join('\n        ')}
    </div>
</nav>`;

        // Logique de changement de patient
        const selector = this.querySelector('#patient-selector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                const newPatient = e.target.value;
                localStorage.setItem('selectedPatient', newPatient);

                // On prévient la page actuelle que le patient a changé
                window.dispatchEvent(new CustomEvent('patientChanged', { detail: newPatient }));
            });
        }
    }
}

customElements.define('mc-navbar', McNavbar);