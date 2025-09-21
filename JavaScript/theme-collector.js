(function () {
    'use strict';
    const THEMES = ['u-theme-dark', 'u-theme-light'];
    const html = document.documentElement;

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (_) { }

    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'u-theme-dark' : 'u-theme-light';
    }

    html.classList.remove(...THEMES);
    html.classList.add(savedTheme);
    html.setAttribute('color-scheme', savedTheme === 'u-theme-dark' ? 'dark' : 'light');
})();