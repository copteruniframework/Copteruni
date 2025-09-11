// Button über Attribut finden
const output = document.getElementById("imageSrcOutput");
const cpyButton = document.querySelector('[data-cu-btn="cpy"]');
const pNaturalWidth = document.getElementById("naturalWidth");
const pThumbWidth = document.getElementById("Width");

const inputYtVideoId = document.getElementById("ytVideoId");
const imgThumbnail = document.getElementById("thumbnail");
const imgThumbnailLabel = imgThumbnail.parentElement.querySelector('.image_text_label');

const initVideoId = inputYtVideoId.placeholder

const YT_IMG_HOST_JPG = 'https://i.ytimg.com/vi/'
const YT_IMG_HOST_WEBP = 'https://i.ytimg.com/vi_webp/'

/**
 * Baut die Thumbnail-URL für eine YouTube-Video-ID.
 * @param {string} id        - YouTube Video ID (z. B. "POg49GumiVQ")
 * @param {string} variant   - z. B. "sddefault" | "maxresdefault"
 * @param {("jpg"|"webp")} format - Bildformat "jpg"|"webp"
 * @returns {string} URL oder leerer String
 */
function ytThumbUrl(id, variant = 'sddefault', format = "jpg") {
    if (!id) return ''
    return `${YT_IMG_HOST_JPG}${encodeURIComponent(id)}/${variant}.jpg` // Init: ytThumbUrl(id, 'sddefault')
}

function updateThum(id) {
    if (!id?.trim()) {
        imgThumbnail.src = ytThumbUrl(initVideoId, 'maxresdefault')
    } else {
        imgThumbnail.src = ytThumbUrl(id.trim(), 'maxresdefault')
    }
    output.value = imgThumbnail.src;
    imgThumbnail.onload = () => {
        imgThumbnailLabel.textContent = `${imgThumbnail.naturalWidth} x ${imgThumbnail.naturalHeight}px`;
        pNaturalWidth.textContent = `Originalbreite des Bildes: ${imgThumbnail.naturalWidth}px`;
        pThumbWidth.innerHTML = `<strong>Angezeigte Breite: ${imgThumbnail.width}px</strong>`;
    };
}

// Init
updateThum()

inputYtVideoId.addEventListener("input", function (event) {
    updateThum(event.target.value)
});

// Klick-Ereignis für den Copy-Button
cpyButton.addEventListener("click", function () {
    if (output.value) {
        navigator.clipboard.writeText(output.value)
    }
});

//https://i.ytimg.com/vi_webp/POg49GumiVQ/maxresdefault.webp