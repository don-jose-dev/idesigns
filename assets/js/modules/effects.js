/**
 * Effects Module
 * Typing effect, magnetic buttons, scroll progress, WhatsApp pulse
 */

export function initTypingEffect() {
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
}

export function initMagneticButtons() {
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
}

export function initScrollProgress() {
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
}

export function initWhatsAppPulse() {
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
}

export function initImageSkeletons() {
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
}

export function initAccessibility() {
  // Focus management for keyboard navigation
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
}

export function initSwiper() {
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
}

