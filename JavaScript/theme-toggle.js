document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const THEMES = ['u-theme-dark', 'u-theme-light'];
    const html = document.documentElement;
    const toggleBtn = document.getElementById('methemetoggle');

    if (!toggleBtn) {
        console.warn('Toggle-Button mit ID "methemetoggle" nicht gefunden.');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = html.classList.contains('u-theme-dark');
        const newTheme = isDark ? 'u-theme-light' : 'u-theme-dark';

        html.classList.remove(...THEMES);
        html.classList.add(newTheme);

        // globales Attribut setzen
        html.setAttribute(
            'color-scheme',
            newTheme === 'u-theme-dark' ? 'dark' : 'light'
        );

        try {
            localStorage.setItem('theme', newTheme);
        } catch (_) { }
    });
});