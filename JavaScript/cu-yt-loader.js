// YouTube Video Loader
// Ersetzt ein Div mit data-cu-yt Attribut durch ein YouTube iFrame beim Klicken
document.querySelectorAll("[data-cu-yt]").forEach((wrapper) => {
    // --- A11y-Label am Container setzen ---
    const targetDiv = wrapper.querySelector("div");
    const img = targetDiv?.querySelector("img");
    const alt = (img?.getAttribute("alt") || "").trim();
    const explicitTitle = (wrapper.getAttribute("data-cu-yt-title") || "").trim();
    const title = explicitTitle || alt || "Video";

    wrapper.setAttribute("aria-label", `Video abspielen: ${title}`);

    // --- Dein bestehender Click-Handler ---
    wrapper.addEventListener(
        "click",
        () => {
            const videoId = wrapper.getAttribute("data-cu-yt");
            if (!videoId) return;

            if (!targetDiv) return;

            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&rel=0`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute(
                "allow",
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            );

            // Alt-/Titel auch am iFrame nutzen (Accessible Name)
            if (title) {
                iframe.title = title;
                iframe.setAttribute("aria-label", title);
            }

            targetDiv.replaceWith(iframe);
        },
        { once: true }
    );
});