/**
 * <mc-navbar active="dashboard" dir="aidant">
 *   active : dashboard | profile | media | statistics
 *   dir    : aidant | statistics  (controls relative paths)
 */
class McNavbar extends HTMLElement {
    static get observedAttributes() { return ['active', 'dir']; }

    connectedCallback()              { this._render(); }
    attributeChangedCallback()       { this._render(); }

    _render() {
        const active = this.getAttribute('active') || 'dashboard';
        const dir    = this.getAttribute('dir')    || 'aidant';

        const isStats  = dir === 'statistics';
        const prefix   = isStats ? '../aidant/' : '';
        const statsHref = isStats ? 'statistics.html' : '../statistics/statistics.html';
        const homeHref  = '../index/index.html';

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
    <div class="navbar__links">
        ${links.map(l =>
            `<a href="${l.href}" class="nav-item${l.key === active ? ' active' : ''}${l.logout ? ' btn-logout' : ''}">${l.label}</a>`
        ).join('\n        ')}
    </div>
</nav>`;
    }
}

customElements.define('mc-navbar', McNavbar);
