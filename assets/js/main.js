const ready = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

ready(() => {
  const header = document.querySelector('.site-header');
  const navList = document.querySelector('.primary-nav__list');
  const toggleButton = document.querySelector('.menu-toggle');

  if (toggleButton && navList) {
    toggleButton.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    navList.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
      })
    );

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        navList.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (header) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          header.classList.toggle('is-sticky', !entry.isIntersecting);
        },
        {
          rootMargin: '-120px 0px 0px 0px',
        }
      );
      observer.observe(hero);
    }
  }

  if (window.Swiper) {
    new Swiper('.swiper', {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  const callToggle = document.querySelector('.call-toggle');
  const callPopup = document.getElementById('call-popup');
  const callClose = callPopup ? callPopup.querySelector('.call-popup__close') : null;

  if (callToggle && callPopup) {
    const setPopupVisibility = (isVisible) => {
      if (isVisible) {
        callPopup.removeAttribute('hidden');
        callToggle.setAttribute('aria-expanded', 'true');
        callToggle.classList.add('is-active');
      } else {
        callPopup.setAttribute('hidden', '');
        callToggle.setAttribute('aria-expanded', 'false');
        callToggle.classList.remove('is-active');
      }
    };

    const isPopupOpen = () => !callPopup.hasAttribute('hidden');

    const closePopup = () => {
      if (!isPopupOpen()) return;
      setPopupVisibility(false);
    };

    callToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setPopupVisibility(!isPopupOpen());
    });

    if (callClose) {
      callClose.addEventListener('click', (event) => {
        event.stopPropagation();
        closePopup();
      });
    }

    callPopup.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(closePopup, 100);
      });
    });

    document.addEventListener('click', (event) => {
      if (!isPopupOpen()) return;
      if (callPopup.contains(event.target) || callToggle.contains(event.target)) return;
      closePopup();
    });

  document.addEventListener('click', (event) => {
    if (!callPopup || callPopup.hasAttribute('hidden')) return;
    if (callToggle?.contains(event.target) || callPopup.contains(event.target)) return;
    toggleCallPopup(false);
  });
});
