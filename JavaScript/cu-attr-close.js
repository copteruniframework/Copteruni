document.addEventListener('DOMContentLoaded', () => {
  // --- Helpers für cu-banner + Storage ---
  const isCuBanner = (el) => el && el.tagName && el.tagName.toLowerCase() === 'cu-banner';
  const getCuId    = (el) => (el.getAttribute?.('data-cu-id') || '').trim();
  const storageKey = (id) => `cu-banner:${id}`;

  const markBannerClosed = (el) => {
    if (!isCuBanner(el)) return;
    const id = getCuId(el);
    if (!id) return; // nur speichern, wenn die ID nicht leer ist
    try {
      const ts = new Date().toISOString();
      localStorage.setItem(storageKey(id), ts);
      // optionales Log für Debug:
      console.log('[cu-banner] closed → localStorage gesetzt', { key: storageKey(id), value: ts });
    } catch (err) {
      // Silent by default – bei Bedarf Warnung aktivieren:
      // console.warn('[cu-banner] Konnte localStorage nicht setzen:', err);
    }
  };
  // --------------------------------------

  // Hilfsfunktion: Element "schließen"
  const closeElement = (el) => {
    if (!el) return;

    // 1) Native <dialog> mit .close()
    if (el instanceof HTMLDialogElement) {
      try {
        el.close(); // entfernt open-Attribut
      } catch {
        // Fallback: falls .close() fehlschlägt, einfach verstecken (ohne aria-hidden für dialog)
        el.style.display = 'none';
      }
      // Dialog ist kein cu-banner → nichts in Storage
      return;
    }

    // 2) Alle anderen Elemente (inkl. <cu-banner>):
    //    display:none + aria-hidden="true"
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');

    // NEU: Falls es ein <cu-banner> mit data-cu-id ist → Storage setzen
    markBannerClosed(el);
  };

  // Delegierter Click-Handler für JETZT und ZUKÜNFTIGE Buttons
  document.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-cu-close-btn]');
    if (!btn) return;

    // Logging, wenn Button in einem <cu-banner> sitzt (bestehend beibehalten)
    const bannerEl = btn.closest('cu-banner');
    if (bannerEl) {
      const bannerId = getCuId(bannerEl) || bannerEl.id || '(ohne ID)';
      const value    = btn.getAttribute('data-cu-close-btn'); // kann "" sein
      console.log('[cu-banner] Close-Button geklickt', { bannerId, value, bannerEl, btn });
    }

    // Button in Formularen soll nicht submitten
    if (btn.tagName === 'BUTTON' && !btn.hasAttribute('type')) {
      btn.setAttribute('type', 'button');
    }

    // Wert des Steuer-Attributes lesen (kann "" sein)
    const targetId = btn.getAttribute('data-cu-close-btn');

    // Fall A: Leerer Wert -> übergeordnetes <dialog> ODER <cu-banner> schließen (in dieser Reihenfolge)
    if (targetId === '') {
      const container = btn.closest('dialog') || btn.closest('cu-banner');
      if (container) {
        evt.preventDefault();
        closeElement(container); // markBannerClosed wird intern aufgerufen, falls cu-banner
      }
      return;
    }

    // Fall B: Konkrete TARGET_ID -> ALLE passenden [data-cu-id="TARGET_ID"] schließen
    if (targetId) {
      evt.preventDefault();
      const targets = document.querySelectorAll(`[data-cu-id="${CSS.escape(targetId)}"]`);
      if (targets.length === 0) return;
      targets.forEach(closeElement); // markBannerClosed wird intern aufgerufen (falls cu-banner)
    }
  }, { capture: true });
});