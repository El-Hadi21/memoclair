/**
 * <mc-stat-card
 *   icon="⏱️"
 *   card-title="Temps de jeu"
 *   value="50 min"
 *   trend="+15% par rapport à la semaine dernière"
 *   trend-type="positive">
 * </mc-stat-card>
 *
 * trend-type: positive | negative | (omit for neutral)
 */
class McStatCard extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'card-title', 'value', 'trend', 'trend-type'];
    }

    connectedCallback()        { this._render(); }
    attributeChangedCallback() { this._render(); }

    _render() {
        const icon      = this.getAttribute('icon')       || '';
        const title     = this.getAttribute('card-title') || '';
        const value     = this.getAttribute('value')      || '';
        const trend     = this.getAttribute('trend')      || '';
        const trendType = this.getAttribute('trend-type') || '';

        this.innerHTML = `
<article class="stat-card">
    <div class="stat-card__header">
        <h3 class="stat-card__title">${title}</h3>
        <span class="stat-card__icon" aria-hidden="true">${icon}</span>
    </div>
    <p class="stat-card__value">${value}</p>
    ${trend ? `<p class="stat-card__trend${trendType ? ' ' + trendType : ''}">${trend}</p>` : ''}
</article>`;
    }
}

customElements.define('mc-stat-card', McStatCard);
