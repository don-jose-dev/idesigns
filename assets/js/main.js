function ready(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function getAttribute(element, attribute) {
  if (!element) {
    return null;
  }

  var value = element.getAttribute(attribute);
  return value === null ? null : value;
}

function getAnimateDelay(element) {
  return getAttribute(element, 'data-animate-delay');
}

function shouldAnimateOnce(element) {
  var value = getAttribute(element, 'data-animate-once');
  return value === null || value !== 'false';
}

ready(function () {
  var prefersReducedMotion =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false };

  var body = document.body;
  var hasClassList = body && body.classList && typeof body.classList.add === 'function';

  if (!prefersReducedMotion.matches && hasClassList) {
    body.classList.add('has-animations');

    var animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length) {
      if (typeof window.IntersectionObserver === 'function') {
        var animationObserver = new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              var element = entry.target;
              var elementClassList = element.classList;

              if (!elementClassList) {
                return;
              }

              if (entry.isIntersecting) {
                var delay = getAnimateDelay(element);
                element.style.animationDelay = delay || '';

                elementClassList.add('is-visible');

                if (shouldAnimateOnce(element)) {
                  observer.unobserve(element);
                }
              } else if (!shouldAnimateOnce(element)) {
                elementClassList.remove('is-visible');
              }
            });
          },
          {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px',
          }
        );

        Array.prototype.forEach.call(animatedElements, function (element) {
          animationObserver.observe(element);
        });
      } else {
        Array.prototype.forEach.call(animatedElements, function (element) {
          if (element.classList) {
            element.classList.add('is-visible');
          }
        });
      }
    }
  }

  var header = document.querySelector('.site-header');
  var navList = document.querySelector('.primary-nav__list');
  var toggleButton = document.querySelector('.menu-toggle');

  if (toggleButton && toggleButton.classList && navList && navList.classList) {
    toggleButton.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('open');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    Array.prototype.forEach.call(navList.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) {
        navList.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (header && header.classList && typeof window.IntersectionObserver === 'function') {
    var hero = document.querySelector('.hero');
    if (hero) {
      var observer = new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          if (!entry) {
            return;
          }
          if (!entry.isIntersecting) {
            header.classList.add('is-sticky');
          } else {
            header.classList.remove('is-sticky');
          }
        },
        {
          rootMargin: '-120px 0px 0px 0px',
        }
      );
      observer.observe(hero);
    }
  } else if (header && header.classList) {
    window.addEventListener('scroll', function () {
      var scrollTop =
        typeof window.pageYOffset === 'number'
          ? window.pageYOffset
          : document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop > 120) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    });
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

  var callToggle = document.querySelector('.call-toggle');
  var callPopup = document.getElementById('call-popup');
  var callClose = document.querySelector('.call-popup__close');

  var toggleCallPopup = function (show) {
    if (!callPopup) {
      return;
    }

    var shouldShow = typeof show === 'boolean' ? show : callPopup.hasAttribute('hidden');

    if (shouldShow) {
      callPopup.removeAttribute('hidden');
      if (callToggle) {
        callToggle.setAttribute('aria-expanded', 'true');
      }
    } else {
      callPopup.setAttribute('hidden', '');
      if (callToggle) {
        callToggle.setAttribute('aria-expanded', 'false');
      }
    }
  };

  if (callToggle) {
    callToggle.addEventListener('click', function () {
      toggleCallPopup();
    });
  }

  if (callClose) {
    callClose.addEventListener('click', function () {
      toggleCallPopup(false);
    });
  }

  document.addEventListener('click', function (event) {
    if (!callPopup || callPopup.hasAttribute('hidden')) {
      return;
    }
    if (event.target === callToggle || (callPopup.contains && callPopup.contains(event.target))) {
      return;
    }
    toggleCallPopup(false);
  });
});
