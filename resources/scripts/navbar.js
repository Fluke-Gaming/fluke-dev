fetch('/navbar.html')
  .then(response => response.text())
  .then(html => {
    const navContainer = document.getElementById('navbar');
    if (!navContainer) return;

    navContainer.innerHTML = html;

    const toggle = navContainer.querySelector('.nav__toggle');
    const menu = navContainer.querySelector('.nav__menu');
    const links = navContainer.querySelectorAll('.nav__link');
    const submenu = navContainer.querySelector('.nav__submenu');
    const submenufade = navContainer.querySelector('.nav__submenu-fade');
    const sublinks = navContainer.querySelectorAll('.nav__sublink');

    // ===== ACTIVE LINK =====
    const normalizePath = (path) => {
      return path
        .replace(/index\.html$/i, '')   // remove index.html
        .replace(/\.html$/i, '')        // remove .html
        .replace(/\/+$/, '')            // remove trailing slash
        .toLowerCase();
    };

    const currentPath = normalizePath(window.location.pathname);

    links.forEach(link => {
      const linkPath = normalizePath(new URL(link.href).pathname);
      if (linkPath === currentPath && !linkPath.includes('/coming-soon')) {
        link.classList.add('selected');
      }
    });


    // ===== SUBMENU VISIBILITY =====
    // Show submenu only on pages that need it
    const submenuPages = ['/wow'];
    const showSubmenu = submenuPages.some(p => currentPath === normalizePath(p));

    if (submenu) {
      submenu.classList.toggle('nav__submenu--visible', showSubmenu);

      // ===== SUBMENU SCROLL FADE =====
      const submenuFade = navContainer.querySelector('.nav__submenu-fade');

      if (showSubmenu && submenuFade) {
        function updateSubmenuFade() {
          const atEnd = submenu.scrollLeft + submenu.clientWidth >= submenu.scrollWidth - 4;
          submenuFade.classList.toggle('is-hidden', atEnd);
        }

        submenu.addEventListener('scroll', updateSubmenuFade, { passive: true });
        updateSubmenuFade();

        window.addEventListener('scroll', () => {
          const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          const maxScroll = submenu.scrollWidth - submenu.clientWidth;
          submenu.scrollLeft = scrollPct * maxScroll;
          updateSubmenuFade();
        }, { passive: true });
      }
    }

    // ===== SUBMENU HOVER (non-WoW pages) =====
    if (!showSubmenu && submenu) {
      const wowLink = Array.from(links).find(link =>
        normalizePath(new URL(link.href).pathname) === '/wow'
      );

      if (wowLink) {
        wowLink.addEventListener('mouseenter', () => {
          submenu.classList.add('nav__submenu--visible');
        });

        Array.from(links).filter(link => link !== wowLink).forEach(link => {
          link.addEventListener('mouseenter', () => {
            submenu.classList.remove('nav__submenu--visible');
          });
        });

        navContainer.addEventListener('mouseleave', () => {
          submenu.classList.remove('nav__submenu--visible');
        });
      }
    }

    // ===== ACTIVE SUBLINK =====
    if (showSubmenu) {
      const currentHash = window.location.hash;
      sublinks.forEach(link => {
        const linkHash = new URL(link.href).hash;
        if (linkHash && linkHash === currentHash) {
          link.classList.add('selected');
        }
      });

      // Update active sublink on hash change (single-page anchor nav)
      window.addEventListener('hashchange', () => {
        sublinks.forEach(link => {
          link.classList.toggle('selected', new URL(link.href).hash === window.location.hash);
        });
      });

      // ===== SCROLL SPY =====
      if (showSubmenu) {
        // ===== SCROLL SPY =====
        const sections = Array.from(sublinks)
          .map(link => ({
            hash: new URL(link.href).hash,
            el: document.querySelector(new URL(link.href).hash)
          }))
          .filter(s => s.el);

          let hashTimer, rafId = null;
          const updateActiveSublink = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
              rafId = null;
              const triggerTop = NAVBAR_HEIGHT;
              const triggerBottom = NAVBAR_HEIGHT + 180;

              sections.forEach(({ hash, el }) => {
                const top = el.getBoundingClientRect().top;
                if (top >= triggerTop && top <= triggerBottom) {
                  sublinks.forEach(link => {
                    link.classList.toggle('selected', new URL(link.href).hash === hash);
                  });
                  clearTimeout(hashTimer);
                  hashTimer = setTimeout(() => {
                    history.replaceState(null, '', hash);
                  }, 150);
                }
              });
            });
          };

          window.addEventListener('scroll', updateActiveSublink, { passive: true });
          updateActiveSublink();
      }
    }

    if (!toggle || !menu) return;

    // ===== TOGGLE MENU =====
    const closeMenu = () => {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      toggle.classList.add('is-active');
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // ===== CLOSE ON LINK CLICK =====
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // ===== CLOSE ON OUTSIDE CLICK =====
    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target)) {
        closeMenu();
      }
    });
  });

// ===== SMOOTH ANCHOR SCROLL (navbar offset) =====
const NAVBAR_HEIGHT = 164;

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="#"]');
  if (!link) return;

  const url = new URL(link.href);
  if (url.pathname !== window.location.pathname) return;

  const target = document.querySelector(url.hash);
  if (!target) return;

  e.preventDefault();

  const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });

  history.pushState(null, '', url.hash);
});

// ===== HANDLE DIRECT URL WITH HASH (page load) =====
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    window.addEventListener('load', () => {
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }, { once: true });
  }
}