// JavaScript für das Copteruni-Hauptmenü (g_nav)
// --------------------------------------------------
// Benötigt: GSAP (gsap.min.js + gsap.matchMedia.js)
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.g_nav');
    const btn = document.getElementById('g_nav_btn_mobile_menu');
    const menu = document.querySelector('.g_nav_menu');
    const items = menu.querySelectorAll('.g_nav_item');

    // Ursprungsort merken (Platzhalter vor dem Menü einfügen)
    const placeholder = document.createComment('g_nav_menu:placeholder');
    menu.parentNode.insertBefore(placeholder, menu);

    // --- simpler Scroll-Lock via Klasse auf <body> ---
    const lockScroll = () => document.body.classList.add('u-overflow-hidden');
    const unlockScroll = () => document.body.classList.remove('u-overflow-hidden');

    const mm = gsap.matchMedia();

    mm.add('(max-width: 1024px)', () => {
        // Falls du die Tab-Reihenfolge exakt nach dem Button willst:
        // const moveAfterButton = () => btn.insertAdjacentElement('afterend', menu);
        // const restoreOriginal = () => placeholder.parentNode.insertBefore(menu, placeholder);

        const moveAfterButton = () => nav.insertAdjacentElement('beforeend', menu);
        const restoreOriginal = () => placeholder.parentNode.insertBefore(menu, placeholder);

        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.30, ease: 'power2.out', immediateRender: false },
            onStart() {
                lockScroll();                 // <<< Klasse setzen
                moveAfterButton();
                btn.setAttribute('aria-expanded', 'true');
            },
            onReverseComplete() {
                unlockScroll();               // <<< Klasse entfernen
                gsap.set(menu, { display: 'none' });
                gsap.set(items, { clearProps: 'all' });
                btn.setAttribute('aria-expanded', 'false');
                restoreOriginal();
                // anim.-Styles am Menü optional bereinigen (display separat lassen)
                gsap.set(menu, { clearProps: 'transform,opacity,yPercent,height,overflow' });
            }
        });

        // Timeline: Menü sichtbar + animieren, Items mit Stagger
        tl.set(menu, { display: 'block' }, 0)
            .fromTo(menu, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1 }, 0)
            .set(items, { y: -30, opacity: 0 }, 0)
            .to(items, { y: 0, opacity: 1, stagger: 0.04, duration: 0.3 }, '-=0.2');

        const onClick = () => {
            if (tl.isActive()) return;
            (tl.reversed() || tl.progress() === 0) ? tl.play() : tl.reverse();
        };
        const onKey = (e) => {
            if (e.key === 'Escape' && tl.progress() > 0 && !tl.reversed()) tl.reverse();
        };

        btn.addEventListener('click', onClick);
        document.addEventListener('keydown', onKey);

        // Cleanup beim Verlassen des Breakpoints (≥1024px)
        return () => {
            unlockScroll(); // falls noch aktiv
            btn.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKey);
            tl.kill();
            gsap.set(menu, { clearProps: 'all' });
            gsap.set(items, { clearProps: 'all' });
            btn.setAttribute('aria-expanded', 'false');
            restoreOriginal();
        };
    });
});
