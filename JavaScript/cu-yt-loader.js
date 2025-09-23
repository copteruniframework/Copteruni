document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-cu-yt]').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const videoId = wrapper.getAttribute('data-cu-yt');
            if (!videoId) return;

            const targetDiv = wrapper.querySelector('div'); // inneres Div (img + svg)
            if (!targetDiv) return;

            // Alt-Text vom <img> holen (falls vorhanden)
            const img = targetDiv.querySelector('img');
            const alt = (img?.getAttribute('alt') || '').trim();

            // iFrame erstellen
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');

            // Alt-Text als Accessible Name nutzen (falls vorhanden)
            if (alt) {
                iframe.title = alt;
                iframe.setAttribute('aria-label', alt);
            }

            // Inneres Div durch iFrame ersetzen
            targetDiv.replaceWith(iframe);
        }, { once: true }); // optional: nur einmal klicken lassen
    });
});