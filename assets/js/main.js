const toggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (toggleButton && navMenu) {
  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => navMenu.classList.remove('open'))
  );
}

const header = document.querySelector('header');
if (header) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-sticky', !entry.isIntersecting);
    },
    {
      rootMargin: '-80px 0px 0px 0px',
    }
  );
  observer.observe(document.querySelector('.hero'));
}
