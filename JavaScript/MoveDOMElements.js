document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav_v03");
    if (!nav) return;

    const logo = nav.querySelector("#nav_v03_logo");
    const menu = nav.querySelector("#nav_v03_menu");
    const buttons = nav.querySelector("#nav_v03_buttons");
    const navItems = nav.querySelectorAll(".nav_v03_link_wrapper");

    // Funktion: Gesamtbreite der Wrapper summieren
    function sumWrapperWidths(section) {
        if (!section) return;

        const wrappers = section.querySelectorAll(".nav_v03_link_wrapper");

        let totalWidth = 0;
        wrappers.forEach((el) => {
            totalWidth += el.getBoundingClientRect().width;
        });

        return totalWidth;
    }

    function checkWidths() {
        
        const navWidth = nav.clientWidth; // Aktuelle Breite des Containers
        const navGap = getComputedStyle(nav).gap; // Der mindest-Abstand zwischen den Items

        const gabMinWidth = (navItems.length - 1) * parseFloat(navGap || "0"); // Gesamtes Gap 
        const logoMinWidth = logo.getBoundingClientRect().width; // Breite des Logos
        const menuMinWidth = sumWrapperWidths(menu); // Breite des Menüs
        const buttonsMinWidth = sumWrapperWidths(buttons); // Breite der Buttons

        const totalMinWidth = logoMinWidth + menuMinWidth + buttonsMinWidth + gabMinWidth; // Gesamte minimale Breite

        const fits = totalMinWidth <= parseFloat(navWidth || "0");

        if (!fits) {
            console.warn("Warnung: Die minimale Gesamtbreite überschreitet die max-width des Containers!");
        } else {
            console.log("Die minimale Gesamtbreite passt in die max-width des Containers.");
        }
    }

    // Initialer
    checkWidths();
    window.addEventListener("resize", checkWidths);
});