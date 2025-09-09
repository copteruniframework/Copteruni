document.addEventListener('DOMContentLoaded', () => {
    // Sicheres Escaping für Attributselektoren
    const escapeCSS = (v) => (window.CSS && CSS.escape) ? CSS.escape(v) : v.replace(/"/g, '\\"');

    document.querySelectorAll('[data-cu-close-btn]').forEach(btn => {
        const handler = (ev) => {
            ev.preventDefault();

            const id = btn.getAttribute('data-cu-close-target-id');
            if (!id) return;

            const selector = `[data-cu-close-id="${escapeCSS(id)}"]`;
            const targets = document.querySelectorAll(selector);

            if (!targets.length) {
                console.warn('[close] Kein Ziel gefunden für:', id);
                return;
            }

            targets.forEach(el => {
                el.style.display = 'none';
                el.setAttribute('aria-hidden', 'true');
            });
        };

        // Click
        btn.addEventListener('click', handler);

        // Keyboard (Enter/Space) – falls der Button kein <button> ist
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handler(e);
            }
        });
    });
});