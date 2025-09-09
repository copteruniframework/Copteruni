document.addEventListener('DOMContentLoaded', () => {
  const hoursToMs = h => h * 60 * 60 * 1000;
  const storageKey = (id) => `bannerClosedUntil:${location.pathname}:${id}`;

  // 1) Beim Laden: Gesperrte Banner ausblenden
  document.querySelectorAll('[data-banner]').forEach(banner => {
    const id = banner.getAttribute('data-banner');
    if (!id) return;

    let closedUntil = null;
    try { closedUntil = localStorage.getItem(storageKey(id)); } catch {}
    if (closedUntil && Date.now() < Number(closedUntil)) {
      banner.style.display = 'none';
    } else {
      // Sichtbar lassen (Standard-Display nicht überschreiben, nur falls vorher "none" war)
      if (banner.style.display === 'none') banner.style.display = '';
    }
  });

  // 2) Klick: Nur den passenden Banner ausblenden + Dauer speichern
  document.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-banner-close]');
    if (!btn) return;

    const id = btn.getAttribute('data-banner-close');
    if (!id) return;

    const banner = document.querySelector(`[data-banner="${id}"]`);
    if (!banner) return;

    const hours = parseFloat(banner.getAttribute('data-banner-close-time'));
    const durationMs = hoursToMs(Number.isFinite(hours) && hours > 0 ? hours : 24);

    // Ausblenden
    banner.style.display = 'none';

    // Ablaufzeit speichern
    const expireAt = Date.now() + durationMs;
    try { localStorage.setItem(storageKey(id), String(expireAt)); } catch {}
  });
});