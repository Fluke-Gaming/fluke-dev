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
        link.classList.add('active');
      }
    });

    // hamburger menu toggle
    const hamburger = navContainer.querySelector('.hamburger');
    const navbarLinks = navContainer.querySelector('.navbar-links');

    if (hamburger && navbarLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');
      });

      // close menu when a link is clicked
      links.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navbarLinks.classList.remove('active');
        });
      });
    }
  });
