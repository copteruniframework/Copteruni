document.addEventListener('DOMContentLoaded', () => {
  // Hilfsfunktion: Element "schließen"
  const closeElement = (el) => {
    if (!el) return;

    // 1) Native <dialog> mit .close()
    if (el instanceof HTMLDialogElement) {
      try {
        el.close(); // entfernt das open-Attribut, Screenreader-Status wird vom UA gepflegt
      } catch {
        // Fallback: falls .close() fehlschlägt, einfach verstecken (ohne aria-hidden für dialog)
        el.style.display = 'none';
      }
      return;
    }

    // 2) Alle anderen Elemente (inkl. <cu-banner>):
    //    display:none + aria-hidden="true"
    el.style.display = 'none';
    // Für A11y alle außer <dialog> mit aria-hidden versehen
    el.setAttribute('aria-hidden', 'true');
  };

  // Delegierter Click-Handler für JETZT und ZUKÜNFTIGE Buttons
  document.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-cu-close-btn]');
    if (!btn) return;

    // --- NEU: Logging, wenn Button in einem <cu-banner> sitzt ---
    const bannerEl = btn.closest('cu-banner');
    if (bannerEl) {
      const bannerId = bannerEl.getAttribute('data-cu-id') || bannerEl.id || '(ohne ID)';
      const value    = btn.getAttribute('data-cu-close-btn'); // kann "" sein
      console.log('[cu-banner] Close-Button geklickt', { bannerId, value, bannerEl, btn });
      // nur Log – Schließen passiert gleich wie gehabt
    }
    // -------------------------------------------------------------

    // Button in Formularen soll nicht submitten
    if (btn.tagName === 'BUTTON' && !btn.hasAttribute('type')) {
      btn.setAttribute('type', 'button');
    }

    // Wert des Steuer-Attributes lesen (kann "" sein)
    const targetId = btn.getAttribute('data-cu-close-btn');

    // Fall A: Leerer Wert -> übergeordnetes <dialog> ODER <cu-banner> schließen (in dieser Reihenfolge)
    if (targetId === '') {
      // Priorität: <dialog> vor <cu-banner>
      const container = btn.closest('dialog') || btn.closest('cu-banner');
      if (container) {
        evt.preventDefault();
        closeElement(container);
      }
      // Kein <dialog>/<cu-banner> gefunden → nichts tun (silent)
      return;
    }

    // Fall B: Konkrete TARGET_ID -> ALLE passenden [data-cu-id="TARGET_ID"] schließen
    if (targetId) {
      evt.preventDefault();
      const targets = document.querySelectorAll(`[data-cu-id="${CSS.escape(targetId)}"]`);
      if (targets.length === 0) {
        // Wunsch: still bleiben (keine Warnung). Falls gewünscht, hier console.warn aktivieren.
        return;
      }
      targets.forEach(closeElement);
    }
  }, { capture: true }); // capture hilft, vor anderen Handlern zu reagieren (optional)
});