document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('global_nav_menu_button');
    const menu = document.querySelector('.global_nav_menu');

    if (!toggleButton || !menu) return;

    const mobileBreakpoint = 991;

    const isMobileView = () => window.innerWidth <= mobileBreakpoint;

    toggleButton.addEventListener('click', () => {
        if (!isMobileView()) return;
        menu.classList.toggle('is-open');
    });

    window.addEventListener('resize', () => {
        if (!isMobileView()) {
            menu.classList.remove('is-open');
        }
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