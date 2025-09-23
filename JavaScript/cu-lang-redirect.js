(function () {
  var STORE_KEY = "cu:lang";
  var EN_PREFIX = "en";
  var BOT_UA_RE = /(bot|crawl|spider|slurp|facebookexternalhit|preview|embed)/i;

  function isBot() {
    return BOT_UA_RE.test(navigator.userAgent || "");
  }
  function normalizeLang(v) {
    v = String(v || "").toLowerCase();
    return v.startsWith("de") ? "de" : "en";
  }
  function getPathLang(path) {
    var parts = String(path || "/")
      .split("/")
      .filter(Boolean);
    return parts[0] === EN_PREFIX ? "en" : "de";
  }
  function stripEnPrefix(path) {
    var parts = String(path || "/")
      .split("/")
      .filter(Boolean);
    if (parts[0] === EN_PREFIX) parts.shift();
    var clean = "/" + parts.join("/");
    return clean === "/" ? "/" : clean.replace(/\/+$/, "/");
  }
  function buildPathForLang(path, lang) {
    var base = stripEnPrefix(path);
    if (lang === "en")
      return ("/en" + (base === "/" ? "" : base)).replace(/\/+$/, "/");
    return base;
  }
  function sameUrl(a, b) {
    try {
      var ua = new URL(a, location.origin);
      var ub = new URL(b, location.origin);
      return (
        ua.origin === ub.origin &&
        ua.pathname.replace(/\/+$/, "/") === ub.pathname.replace(/\/+$/, "/") &&
        ua.search === ub.search &&
        ua.hash === ub.hash
      );
    } catch {
      return a === b;
    }
  }
  function desiredFromPreferenceOrSystem() {
    var pref;
    try {
      pref = localStorage.getItem(STORE_KEY);
    } catch { }
    if (pref) return normalizeLang(pref);
    var langs =
      Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || ""];
    return normalizeLang(langs[0]);
  }
  function navigateToLang(targetLang, replace) {
    var path = buildPathForLang(location.pathname, targetLang);
    var url = location.origin + path + location.search + location.hash;
    if (!sameUrl(location.href, url)) {
      replace ? location.replace(url) : location.assign(url);
    }
  }

  if (isBot()) return; // Bots/Crawler nicht weiterleiten

  var wanted = desiredFromPreferenceOrSystem(); // 'de' | 'en'
  var current = getPathLang(location.pathname); // 'de' | 'en'
  if (wanted !== current) {
    // Erster Besuch (keine Präferenz): replace=true, damit Back-Button nicht „festhängt“
    var hasPref = false;
    try {
      hasPref = !!localStorage.getItem(STORE_KEY);
    } catch { }
    navigateToLang(wanted, !hasPref);
  }
})();