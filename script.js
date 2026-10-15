(() => {
  document.documentElement.classList.add('js');

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuButton && nav) {
    const closeMenu = (returnFocus = false) => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', willOpen);
    });

    nav.querySelectorAll('.nav-group > summary').forEach((summary) => {
      summary.addEventListener('click', () => {
        const selectedGroup = summary.parentElement;
        if (selectedGroup.open) return;
        nav.querySelectorAll('.nav-group[open]').forEach((group) => {
          if (group !== selectedGroup) group.open = false;
        });
      });
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        nav.querySelectorAll('.nav-group[open]').forEach((group) => {
          group.open = false;
        });
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const openGroups = [...nav.querySelectorAll('details[open]')];
      if (openGroups.length) {
        const group = openGroups[openGroups.length - 1];
        group.open = false;
        group.querySelector('summary')?.focus();
      } else if (menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });

    const desktop = window.matchMedia('(min-width: 721px)');
    desktop.addEventListener('change', () => closeMenu());
  }

  document.querySelectorAll('.faq-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      const answerId = button.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;
      if (!answer) return;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      answer.hidden = isExpanded;
      const symbol = button.querySelector('span');
      if (symbol) symbol.textContent = isExpanded ? '+' : '−';
    });
  });
})();
