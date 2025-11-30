const ready = (callback) => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

ready(() => {
  const header = document.querySelector(".site-header");
  const navList = document.querySelector(".primary-nav__list");
  const toggleButton = document.querySelector(".menu-toggle");

  if (toggleButton && navList) {
    const closeMenu = () => {
      navList.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    };

    toggleButton.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });

    navList.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        closeMenu();
      }),
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });
  }

  if (header) {
    const hero = document.querySelector(".hero");
    if (hero && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          header.classList.toggle("is-sticky", !entry.isIntersecting);
        },
        {
          rootMargin: "-120px 0px 0px 0px",
        },
      );
      observer.observe(hero);
    } else {
      header.classList.add("is-sticky");
    }
  }

  if (window.Swiper) {
    new Swiper(".swiper", {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
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
});
