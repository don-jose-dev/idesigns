/**
 * Navigation Module
 * Header scroll effect, mobile menu toggle, smooth scrolling
 */

export function initNavigation() {
  const header = document.querySelector(".site-header");
  const navList = document.querySelector(".primary-nav__list");
  const toggleButton = document.querySelector(".menu-toggle");

  // Mobile menu toggle
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
      })
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navList.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const mobileBarHeight = window.innerWidth <= 768 ? 80 : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

export function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");
  
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }, { passive: true });
    
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

