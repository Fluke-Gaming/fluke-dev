fetch('/navbar.html')
  .then(response => response.text())
  .then(html => {
    const navContainer = document.getElementById('navbar');
    if (!navContainer) return;

    navContainer.innerHTML = html;

    const toggle = navContainer.querySelector('.nav__toggle');
    const menu = navContainer.querySelector('.nav__menu');
    const links = navContainer.querySelectorAll('.nav__link');

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
      const linkUrl = new URL(link.href);
      const linkPath = normalizePath(linkUrl.pathname);
      if (
        linkPath === currentPath &&
        !linkPath.includes('/coming-soon')
      ) {
        link.classList.add('selected');
      }
    });

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