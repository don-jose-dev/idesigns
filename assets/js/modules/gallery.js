/**
 * Gallery Module
 * Gallery filters and lightbox functionality
 */

export function initGalleryFilters() {
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
}

export function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox__image");
  const lightboxTitle = lightbox?.querySelector(".lightbox__title");
  const lightboxDesc = lightbox?.querySelector(".lightbox__desc");
  const lightboxCurrent = lightbox?.querySelector(".lightbox__current");
  const lightboxTotal = lightbox?.querySelector(".lightbox__total");
  const galleryItems = document.querySelectorAll(".gallery__item");
  
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
    
    if (lightboxImage) lightboxImage.src = img.src;
    if (lightboxImage) lightboxImage.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = item.dataset.title || "";
    if (lightboxDesc) lightboxDesc.textContent = item.dataset.desc || "";
    if (lightboxCurrent) lightboxCurrent.textContent = currentImageIndex + 1;
    if (lightboxTotal) lightboxTotal.textContent = galleryImages.length;
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
}

