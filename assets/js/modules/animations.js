/**
 * Animations Module
 * Scroll reveal, counter animation, parallax, tilt effects
 */

export function initScrollReveal() {
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
}

export function initCounterAnimation() {
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
}

export function initParallax() {
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
}

export function initTiltEffect() {
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
}

export function initDataAnimations() {
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
}

