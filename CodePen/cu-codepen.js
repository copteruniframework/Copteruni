/**
 * Baut die Thumbnail-URL für eine YouTube-Video-ID.
 * @param {string} id        - YouTube Video ID (z. B. "POg49GumiVQ")
 * @param {string} variant   - z. B. "sddefault" | "maxresdefault"
 * @param {("jpg"|"webp")} format - Bildformat "jpg"|"webp"
 * @returns {string} URL oder leerer String
 * @example
 * const url = ytThumbUrl('POg49GumiVQ', 'maxresdefault', 'jpg');
 */
function ytThumbUrl(id, variant = 'sddefault', format = "jpg") {
    const YT_IMG_HOST_JPG = 'https://i.ytimg.com/vi/'
    const YT_IMG_HOST_WEBP = 'https://i.ytimg.com/vi_webp/'
    if (!id) return ''
    return `${YT_IMG_HOST_JPG}${encodeURIComponent(id)}/${variant}.jpg` // Init: ytThumbUrl(id, 'sddefault')
}

/**
 * Initialisiert das Thumbnail-Feature.
 * @returns {void}
 */
function initYtThumbLinkGen() {
    "use strict";
    // Button über Attribut finden
    const form_ytThumbLinkGen = document.getElementById("ytThumbLinkGen");
    const input_ytVideoId = form_ytThumbLinkGen.querySelector('input[name="ytVideoId"]');
    const img_ytThumbnail = form_ytThumbLinkGen.querySelector('img');
    const label_ytThumbnail = img_ytThumbnail.parentElement.querySelector('.image_text_label');
    const output_ytThumbUrl = form_ytThumbLinkGen.querySelector('input[name="ytThumbUrl"]');





    function updateThum(id) {
        const clrInput = (id || "").trim();
        if (!clrInput) {
            img_ytThumbnail.src = ytThumbUrl(input_ytVideoId.placeholder, 'maxresdefault')
        } else {
            img_ytThumbnail.src = ytThumbUrl(id.trim(), 'maxresdefault')
        }
        output_ytThumbUrl.value = img_ytThumbnail.src;
        img_ytThumbnail.onload = () => {
            label_ytThumbnail.textContent = `${img_ytThumbnail.naturalWidth} x ${img_ytThumbnail.naturalHeight}px`;
        };
    }

    // Init
    updateThum()

    input_ytVideoId.addEventListener("input", function (event) {
        updateThum(event.target.value)
    });
};
initYtThumbLinkGen();


const cpyButton = document.querySelector('[data-cu-btn="cpy"]');
// Klick-Ereignis für den Copy-Button
cpyButton.addEventListener("click", function () {
    if (output_ytThumbUrl.value) {
        navigator.clipboard.writeText(output_ytThumbUrl.value)
    }
});

//https://i.ytimg.com/vi_webp/POg49GumiVQ/maxresdefault.webp

const root = document.documentElement;        // <html>
const toggle = document.getElementById('themeToggle');

// toggle.addEventListener('change', (e) => {
//     if (e.target.checked) {
//         root.setAttribute('data-theme', 'light'); // Light aktiv
//     } else {
//         root.removeAttribute('data-theme');       // zurück zu Dark (Default)
//     }
// });


toggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    root.classList.add('u-theme-light');
    root.classList.remove('u-theme-dark');
  } else {
    root.classList.add('u-theme-dark');
    root.classList.remove('u-theme-light');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('[cu-list-sort="abc"]');

  containers.forEach(container => {
    const items = Array.from(container.children);

    items.sort((a, b) =>
      a.textContent.trim().localeCompare(b.textContent.trim(), "de", { sensitivity: "base" })
    );

    items.forEach(item => container.appendChild(item));
  });
});