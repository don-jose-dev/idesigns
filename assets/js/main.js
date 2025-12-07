/**
 * iDesigns - Modern Interior Design Website
 * Enhanced JavaScript with animations, interactions, and UX improvements
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
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children");
  
  const isMobile = window.innerWidth <= 768;
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: isMobile ? 0.05 : 0.15,
      rootMargin: isMobile ? "0px 0px -30px 0px" : "0px 0px -50px 0px",
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
        const mobileBarHeight = window.innerWidth <= 768 ? 80 : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
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
        640: { slidesPerView: 1.5, spaceBetween: 24 },
        768: { slidesPerView: 2.2, spaceBetween: 28 },
        1024: { slidesPerView: 3, spaceBetween: 32 },
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

  // ===== FORM VALIDATION =====
  const consultationForm = document.getElementById("consultationForm");
  
  if (consultationForm) {
    const validateField = (input) => {
      const wrapper = input.parentElement;
      const errorEl = wrapper.parentElement.querySelector(".error-message");
      let isValid = true;
      let errorMsg = "";
      
      // Remove previous states
      wrapper.classList.remove("valid", "invalid");
      
      if (input.required && !input.value.trim()) {
        isValid = false;
        errorMsg = "This field is required";
      } else if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          errorMsg = "Please enter a valid email";
        }
      } else if (input.type === "tel" && input.value) {
        const phoneRegex = /^[\d\s+()-]{10,15}$/;
        if (!phoneRegex.test(input.value)) {
          isValid = false;
          errorMsg = "Please enter a valid phone number";
        }
      } else if (input.minLength && input.value.length < input.minLength) {
        isValid = false;
        errorMsg = `Minimum ${input.minLength} characters required`;
      }
      
      if (input.value.trim()) {
        wrapper.classList.add(isValid ? "valid" : "invalid");
      }
      
      if (errorEl) {
        errorEl.textContent = isValid ? "" : errorMsg;
      }
      
      return isValid;
    };
    
    // Real-time validation
    consultationForm.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.parentElement.classList.contains("invalid")) {
          validateField(input);
        }
      });
    });
    
    // Form submission
    consultationForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      let isFormValid = true;
      
      // Validate all required fields
      consultationForm.querySelectorAll("[required]").forEach((input) => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        const firstError = consultationForm.querySelector(".invalid");
        if (firstError) {
          firstError.querySelector("input, select")?.focus();
        }
        return;
      }
      
      // Show loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        submitBtn.classList.remove("loading");
        submitBtn.innerHTML = '<span class="btn-text">Request Sent! ✓</span>';
        submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        
        // Reset form after delay
        setTimeout(() => {
          consultationForm.reset();
          consultationForm.querySelectorAll(".valid, .invalid").forEach(el => {
            el.classList.remove("valid", "invalid");
          });
          submitBtn.innerHTML = '<span class="btn-text">Get My Free Design Quote</span><span class="btn-loader"></span>';
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        submitBtn.classList.remove("loading");
        submitBtn.innerHTML = '<span class="btn-text">Error - Try Again</span>';
        submitBtn.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span class="btn-text">Get My Free Design Quote</span><span class="btn-loader"></span>';
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }

  // ===== GALLERY FILTERS =====
  const galleryFilters = document.querySelectorAll(".gallery__filter");
  const galleryItems = document.querySelectorAll(".gallery__item");
  
  galleryFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Update active state
      galleryFilters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      
      const category = filter.dataset.filter;
      
      galleryItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.classList.remove("hidden");
          item.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox__image");
  const lightboxTitle = lightbox?.querySelector(".lightbox__title");
  const lightboxDesc = lightbox?.querySelector(".lightbox__desc");
  const lightboxCurrent = lightbox?.querySelector(".lightbox__current");
  const lightboxTotal = lightbox?.querySelector(".lightbox__total");
  
  let currentImageIndex = 0;
  let galleryImages = [];
  
  const openLightbox = (index) => {
    if (!lightbox) return;
    
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };
  
  const updateLightboxImage = () => {
    if (!galleryImages[currentImageIndex]) return;
    
    const item = galleryImages[currentImageIndex];
    const img = item.querySelector("img");
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = item.dataset.title || "";
    lightboxDesc.textContent = item.dataset.desc || "";
    lightboxCurrent.textContent = currentImageIndex + 1;
    lightboxTotal.textContent = galleryImages.length;
  };
  
  const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  };
  
  const prevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  };
  
  // Initialize lightbox
  if (lightbox) {
    galleryImages = Array.from(galleryItems);
    
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => openLightbox(index));
    });
    
    lightbox.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__next")?.addEventListener("click", nextImage);
    lightbox.querySelector(".lightbox__prev")?.addEventListener("click", prevImage);
    
    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    });
  }

  // ===== BACK TO TOP BUTTON =====
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

  // ===== PARALLAX EFFECT =====
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
  
  if (window.innerWidth > 768) {
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
  }

  // ===== IMAGE SKELETON LOADER =====
  const images = document.querySelectorAll("img[loading='lazy']");
  
  images.forEach((img) => {
    if (img.complete) {
      const skeleton = img.parentElement?.querySelector(".img-skeleton");
      if (skeleton) skeleton.style.display = "none";
    } else {
      img.addEventListener("load", () => {
        const skeleton = img.parentElement?.querySelector(".img-skeleton");
        if (skeleton) {
          skeleton.style.opacity = "0";
          setTimeout(() => skeleton.style.display = "none", 300);
        }
      });
    }
  });

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
    // Check if typing was already done this session
    if (!sessionStorage.getItem("typingDone")) {
      const text = heroTitle.textContent;
      heroTitle.textContent = "";
      heroTitle.style.opacity = "1";
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        } else {
          sessionStorage.setItem("typingDone", "true");
        }
      };
      
      setTimeout(typeWriter, 800);
    }
  }

  // ===== TILT EFFECT FOR CARDS =====
  const tiltCards = document.querySelectorAll(".why-card, .process-card, .service-card");
  
  if (window.innerWidth > 992) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
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
  }

  // ===== WHATSAPP BUTTON PULSE =====
  const whatsappBtn = document.querySelector(".floating-button--whatsapp");
  
  if (whatsappBtn) {
    setTimeout(() => {
      const pulse = document.createElement("span");
      pulse.className = "whatsapp-pulse";
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

  const focusStyle = document.createElement("style");
  focusStyle.textContent = `
    body.keyboard-nav *:focus {
      outline: 3px solid var(--color-orange) !important;
      outline-offset: 3px;
    }
  `;
  document.head.appendChild(focusStyle);

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
  });

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.animationPlayState = 'paused';
    scrollObserver.observe(el);
  });

  console.log("🏠 iDesigns website loaded successfully!");
});
