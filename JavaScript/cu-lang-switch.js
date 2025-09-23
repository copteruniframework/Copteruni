document.addEventListener("DOMContentLoaded", () => {
    const STORE_KEY = "cu:lang";
    const EN_PREFIX = "en";

    const normalizeLang = (v) =>
        String(v || "")
            .toLowerCase()
            .startsWith("de")
            ? "de"
            : "en";

    const stripEnPrefix = (path) => {
        const parts = String(path || "/")
            .split("/")
            .filter(Boolean);
        if (parts[0] === EN_PREFIX) parts.shift();
        const clean = "/" + parts.join("/");
        return clean === "/" ? "/" : clean.replace(/\/+$/, "/");
    };

    const buildPathForLang = (path, lang) => {
        const base = stripEnPrefix(path);
        return lang === "en"
            ? `/en${base === "/" ? "" : base}`.replace(/\/+$/, "/")
            : base;
    };

    const sameUrl = (a, b) => {
        try {
            const ua = new URL(a, location.origin);
            const ub = new URL(b, location.origin);
            return (
                ua.origin === ub.origin &&
                ua.pathname.replace(/\/+$/, "/") === ub.pathname.replace(/\/+$/, "/") &&
                ua.search === ub.search &&
                ua.hash === ub.hash
            );
        } catch {
            return a === b;
        }
    };

    const navigateToLang = (targetLang, { replace = false } = {}) => {
        const path = buildPathForLang(location.pathname, targetLang);
        const url = location.origin + path + location.search + location.hash;
        if (!sameUrl(location.href, url)) {
            replace ? location.replace(url) : location.assign(url);
        }
    };

    // Klick-Init für alle Sprachschalter
    document.querySelectorAll("[data-cu-lang]").forEach((el) => {
        el.addEventListener(
            "click",
            (evt) => {
                evt.preventDefault();
                const lang = normalizeLang(el.getAttribute("data-cu-lang"));
                try {
                    localStorage.setItem(STORE_KEY, lang);
                } catch { }
                navigateToLang(lang);
            },
            { passive: false }
        );

        // Optional: Tastaturbedienung für Nicht-Links
        el.addEventListener("keydown", (e) => {
            if (
                (e.key === "Enter" || e.key === " ") &&
                !/^(a|button)$/i.test(el.tagName)
            ) {
                e.preventDefault();
                const lang = normalizeLang(el.getAttribute("data-cu-lang"));
                try {
                    localStorage.setItem(STORE_KEY, lang);
                } catch { }
                navigateToLang(lang);
            }
        });
    });
});