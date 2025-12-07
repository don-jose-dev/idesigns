/**
 * iDesigns - Modern Interior Design Website
 * Enhanced JavaScript with animations and interactions
 */

const ready = (callback) => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

ready(() => {
  // ===== PAGE LOAD ANIMATION =====
  document.body.classList.add("loaded");

  // ===== HEADER & NAVIGATION =====
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
    let lastScroll = 0;
    
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children");
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Unobserve after animation to improve performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== SMOOTH ANCHOR SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== SWIPER CAROUSEL =====
  if (window.Swiper) {
    new Swiper(".swiper", {
      slidesPerView: 1.2,
      spaceBetween: 24,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 28,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
      effect: "slide",
      grabCursor: true,
    });
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll("[data-counter]");
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-counter"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };
    
    updateCounter();
  };

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // ===== FORM INTERACTIONS =====
  const formInputs = document.querySelectorAll("input, select, textarea");
  
  formInputs.forEach((input) => {
    // Add focus effects
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });
    
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
      if (input.value) {
        input.parentElement.classList.add("has-value");
      } else {
        input.parentElement.classList.remove("has-value");
      }
    });
  });

  // Form submission handling
  const consultationForm = document.querySelector(".consultation form");
  if (consultationForm) {
    consultationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual submission)
      setTimeout(() => {
        submitBtn.textContent = "Request Sent! ✓";
        submitBtn.style.background = "linear-gradient(135deg, #11998e, #38ef7d)";
        
        // Reset form after delay
        setTimeout(() => {
          consultationForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ===== PARALLAX EFFECT (subtle) =====
  const hero = document.querySelector(".hero");
  
  if (hero && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroMedia = hero.querySelector(".hero__media");
      
      if (heroMedia && scrolled < window.innerHeight) {
        heroMedia.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ===== MAGNETIC BUTTON EFFECT =====
  const magneticButtons = document.querySelectorAll(".btn--primary");
  
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // ===== LAZY LOADING IMAGES =====
  const lazyImages = document.querySelectorAll("img[data-src]");
  
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // ===== SCROLL PROGRESS INDICATOR =====
  const createScrollProgress = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #ff6b35, #ff8f70);
      z-index: 9999;
      transition: width 0.1s ease;
      width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
  };
  
  createScrollProgress();

  // ===== TYPING EFFECT FOR HERO =====
  const heroTitle = document.querySelector(".hero__content h1");
  
  if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    heroTitle.style.opacity = "1";
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    // Start typing after hero animation
    setTimeout(typeWriter, 800);
  }

  // ===== TILT EFFECT FOR CARDS =====
  const tiltCards = document.querySelectorAll(".why-card, .process-card, .service-card");
  
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 992) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ===== WHATSAPP BUTTON PULSE =====
  const whatsappBtn = document.querySelector(".floating-button--whatsapp");
  
  if (whatsappBtn) {
    // Add pulse notification after 5 seconds
    setTimeout(() => {
      const pulse = document.createElement("span");
      pulse.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background: #ff6b35;
        border-radius: 50%;
        border: 2px solid white;
        animation: pulse-notification 2s infinite;
      `;
      
      const style = document.createElement("style");
      style.textContent = `
        @keyframes pulse-notification {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `;
      document.head.appendChild(style);
      whatsappBtn.appendChild(pulse);
    }, 5000);
  }

  // ===== ACCESSIBILITY: FOCUS MANAGEMENT =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });

  // Add focus styles for keyboard navigation
  const focusStyle = document.createElement("style");
  focusStyle.textContent = `
    body.keyboard-nav *:focus {
      outline: 3px solid var(--color-orange) !important;
      outline-offset: 3px;
    }
  `;
  document.head.appendChild(focusStyle);

  console.log("🏠 iDesigns website loaded successfully!");
});
