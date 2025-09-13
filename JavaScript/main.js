// Slider-Horizontal
document.addEventListener("DOMContentLoaded", () => {
  const debounce = (fn, delay = 100) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  document.querySelectorAll('.horizontal_slider_container').forEach(slider => {
    const wrapper = slider.querySelector('[data-slider="content"]');
    const btnRight = slider.querySelector('[data-slider="btn-right"]');
    const btnLeft = slider.querySelector('[data-slider="btn-left"]');
    const buttonGroup = slider.querySelector('.button_group_wrapper');
    const wrapRightMain = btnRight?.closest('.button_main_wrap');
    const wrapLeftMain = btnLeft?.closest('.button_main_wrap');

    const getItems = () =>
      wrapper.querySelectorAll('[data-slider="item"]').length
        ? Array.from(wrapper.querySelectorAll('[data-slider="item"]'))
        : Array.from(wrapper.children);

    const scrollToItem = (index) => {
      const items = getItems();
      if (index < 0 || index >= items.length) return;
      items[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest' // ← verhindert vertikales Scrollen
      });
    };


    const getCenteredIndex = () => {
      const items = getItems();
      const centerX = wrapper.getBoundingClientRect().left + wrapper.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const dist = Math.abs(itemCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    const scrollToNext = () => scrollToItem(getCenteredIndex() + 1);
    const scrollToPrevious = () => scrollToItem(getCenteredIndex() - 1);

    const updateButtons = () => {
      const scrollLeft = wrapper.scrollLeft;
      const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScrollLeft - 1;
      const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth;

      if (!hasOverflow) {
        buttonGroup?.style.setProperty('display', 'none');
        wrapLeftMain?.style.setProperty('display', 'none');
        wrapRightMain?.style.setProperty('display', 'none');
        return;
      }

      buttonGroup?.style.setProperty('display', 'flex');
      wrapLeftMain?.style.setProperty('display', atStart ? 'none' : 'flex');
      wrapRightMain?.style.setProperty('display', atEnd ? 'none' : 'flex');
    };

    // Events
    btnRight?.addEventListener('click', scrollToNext);
    btnLeft?.addEventListener('click', scrollToPrevious);
    wrapper?.addEventListener('scroll', debounce(updateButtons));
    window.addEventListener('resize', debounce(updateButtons, 150));

    setTimeout(updateButtons, 200); // Initialer Delay für Layout-Stabilität
  });
});

// Details - Dropdown
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = summary.nextElementSibling;

    const closeDetails = () => {
      if (!detail.open || gsap.isTweening(content)) return;

      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          detail.open = false;
          gsap.set(content, { clearProps: "all" });
        }
      });
    };

    summary.addEventListener('click', e => {
      e.preventDefault();
      if (gsap.isTweening(content)) return;

      if (!detail.open) {
        detail.open = true;
        gsap.fromTo(content, {
          height: 0,
          opacity: 0
        }, {
          height: content.scrollHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(content, { clearProps: "all" });
          }
        });
      } else {
        closeDetails();
      }
    });

    // AUTOCLOSE HANDLING
    if (detail.dataset.autoclose === "true") {
      document.addEventListener('click', (e) => {
        // Wenn Klick außerhalb des <details>
        if (!detail.contains(e.target)) {
          closeDetails();
        }
      });
    }
  });
});


/**
 * Setzt das **aktuelle Jahr** in alle `<time>`-Elemente mit `datetime="currentYear"`.
 *
 * - Aktualisiert **sichtbaren Text** (`textContent`) und das **`datetime`-Attribut** (ISO-Jahr).
 * - Nützlich für Footer-Copyrights, damit keine jährliche manuelle Pflege nötig ist.
 *
 * @returns {void} Gibt keinen Wert zurück.
 *
 * @example
 * // HTML:
 * // <small class="u-display-block u-text-align-center">
 * //   <span>Copyright © </span>
 * //   <time datetime="currentYear"></time>
 * //   <span> Copteruni GmbH, alle Rechte vorbehalten.</span>
 * // </small>
 *
 * // JavaScript:
 * initCurrentYear();
 *
 * @example
 * // Als ES-Module nach DOM-Ladung:
 * document.addEventListener('DOMContentLoaded', () => {
 *   initCurrentYear();
 * });
 *
 * @since 1.0.0
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element
 */
function initCurrentYear() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('time[datetime="currentYear"]').forEach(el => {
    el.dateTime = currentYear;
    el.textContent = currentYear;
  });
}

// GSAP

// hide-show-fab
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.fab-section-center-bottom').forEach((fabEl) => {
    const parent = fabEl.parentElement;

    if (parent) {
      // Ausgangszustand: versteckt
      gsap.set(fabEl, { autoAlpha: 0 });

      // ScrollTrigger mit reversiblem Verhalten
      gsap.to(fabEl, {
        autoAlpha: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top+=150px bottom',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
});