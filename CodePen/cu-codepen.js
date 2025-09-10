// Button über Attribut finden
const button = document.querySelector('[data-cu-btn="ex1"]');
const output = document.getElementById("imageSrcOutput");
const cpyButton = document.querySelector('[data-cu-btn="cpy"]');
const outNaturalWidth = document.getElementById("naturalWidth");

const inputYtVideoId = document.getElementById("ytVideoId");
const imgThumbnail = document.getElementById("thumbnail");

let ytVideoId = inputYtVideoId.placeholder

const YT_IMG_HOST_JPG = 'https://i.ytimg.com/vi/'
function ytThumbUrl(id, variant = 'sddefault') {
    if (!id) return ''
    return `${YT_IMG_HOST_JPG}${encodeURIComponent(id)}/${variant}.jpg` // Init: ytThumbUrl(id, 'sddefault')
}

// Init
imgThumbnail.src = ytThumbUrl(ytVideoId, 'maxresdefault')
output.value = imgThumbnail.src;


inputYtVideoId.addEventListener("input", function (event) {
    imgThumbnail.src = ytThumbUrl(event.target.value, 'maxresdefault')
    output.value = imgThumbnail.src;
});

//https://i.ytimg.com/vi_webp/POg49GumiVQ/maxresdefault.webp

// Klick-Ereignis für den ersten Button
button.addEventListener("click", function () {
    // Attributwert vom Button lesen
    const btnValue = button.dataset.cuBtn;   // z.B. "ex1"

    // Bild mit gleichem data-cu-id suchen
    const image = document.querySelector(`[data-cu-id="${btnValue}"]`);

    // URL ins Input schreiben
    output.value = image.src;

    outNaturalWidth.textContent = `Originalbreite des Bildes: ${image.naturalWidth}px`;

    // In der Konsole Infos ausgeben
    console.log("Button-Attribut:", btnValue);
    console.log("Gefundenes Bild:", image);
    console.log("Angezeigte Breite:", image.width);
    console.log("Originalbreite:", image.naturalWidth);
    console.log(ytDefaultId)
    console.log(urlYT_IMG_HOST_JPG)
});

// Klick-Ereignis für den Copy-Button
cpyButton.addEventListener("click", function () {
    if (output.value) {
        navigator.clipboard.writeText(output.value)
    }
});
