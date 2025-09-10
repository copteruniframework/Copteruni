// Button über Attribut finden
const button = document.querySelector('[data-cu-btn="ex1"]');

// Klick-Ereignis
button.addEventListener("click", function () {
    // Attributwert vom Button lesen
    const btnValue = button.dataset.cuBtn;   // z.B. "ex1"

    // Bild mit gleichem Wert suchen
    const image = document.querySelector(`[data-cu-id="${btnValue}"]`);

    // In der Konsole ausgeben
    console.log("Button-Attribut:", btnValue);
    console.log("Gefundenes Bild:", image);
    console.log(image.width); // angezeigte Breite in Pixel
    console.log(image.naturalWidth);  // originale Breite der Bilddatei
});
