document.addEventListener('DOMContentLoaded', () => {
    const navBtn = document.querySelector('[data-nav-btn="menu"]');
    const navMenu = document.querySelector('[data-nav-item="menu"]');
    if (!navBtn || !navMenu) return;

    // <use>-Element im Button finden (robust, falls weitere Wrapper existieren)
    const useEl = navBtn.querySelector('svg use');
    const XLINK_NS = 'http://www.w3.org/1999/xlink';

    // Ziel-Icons
    const ICON_CLOSED = '#icon-menu';
    const ICON_OPEN = '#icon-x-lg';

    // Helper: Icon-HREF setzen (SVG2 + Legacy-Safari)
    const setUseHref = (value) => {
        if (!useEl) return;
        useEl.setAttribute('href', value);                    // modern
        useEl.setAttributeNS(XLINK_NS, 'xlink:href', value);  // legacy
    };

    // Helper: Icon & ARIA anhand des aktuellen Zustands aktualisieren
    const syncIconToState = () => {
        const isOpen = navMenu.classList.contains('is-open');
        setUseHref(isOpen ? ICON_OPEN : ICON_CLOSED);
        navBtn.setAttribute('aria-expanded', String(isOpen));
    };

    // Initialen Zustand abbilden
    syncIconToState();

    // Klick-Handler: Menü togglen + Icon updaten
    navBtn.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
        syncIconToState();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.getElementById("global_header");

    let isHidden = false;
    let scrollStartY = window.scrollY;
    let scrollDirection = 1;
    const triggerUpDistance = 500;
    const triggerDownDistance = 100;
    const scrollInactivityTime = 400; // in ms

    let scrollInactivityTimer = null;

    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: self => {
            const currentY = self.scroll();
            const newDirection = self.direction;

            // Immer einblenden, wenn ganz oben
            if (currentY <= 0 && isHidden) {
                gsap.to(navbar, { y: "0%", duration: 0.3, ease: "power2.out" });
                isHidden = false;
                scrollStartY = 0;
                return;
            }

            // Richtungswechsel → reset
            if (newDirection !== scrollDirection) {
                scrollStartY = currentY;
                scrollDirection = newDirection;
            }

            // Inaktivität → reset
            clearTimeout(scrollInactivityTimer);
            scrollInactivityTimer = setTimeout(() => {
                scrollStartY = currentY;
            }, scrollInactivityTime);

            const delta = currentY - scrollStartY;

            // ↓ Ausblenden
            if (scrollDirection === 1 && delta > triggerDownDistance && !isHidden) {
                gsap.to(navbar, { y: "-100%", duration: 0.3, ease: "power2.out" });
                isHidden = true;

                // <details> in der Navbar schließen
                document.querySelectorAll('.global_header details[open]').forEach(detail => {
                    const summary = detail.querySelector('summary');
                    const content = summary.nextElementSibling;

                    if (!gsap.isTweening(content)) {
                        gsap.to(content, {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                detail.open = false;
                                gsap.set(content, { clearProps: 'all' });
                            }
                        });
                    }
                });
            }

            // ↑ Einblenden
            if (scrollDirection === -1 && delta < -triggerUpDistance && isHidden) {
                gsap.to(navbar, { y: "0%", duration: 0.3, ease: "power2.out" });
                isHidden = false;
            }
        }
    });
});