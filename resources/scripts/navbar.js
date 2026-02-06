fetch('/navbar.html')
  .then(response => response.text())
  .then(html => {
    const navContainer = document.getElementById('navbar');
    if (!navContainer) return;

    navContainer.innerHTML = html;

    // active link highlighting
    const links = navContainer.querySelectorAll('a');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('item-primary');
      }
    });
  });
