/**
 * iDesigns - Modern Interior Design Website
 * Main entry point - imports and initializes all modules
 */

// Import modules
import { initNavigation, initBackToTop } from './modules/navigation.js';
import { initScrollReveal, initCounterAnimation, initParallax, initTiltEffect, initDataAnimations } from './modules/animations.js';
import { initGalleryFilters, initLightbox } from './modules/gallery.js';
import { initFormValidation } from './modules/form.js';
import { initTypingEffect, initMagneticButtons, initScrollProgress, initWhatsAppPulse, initImageSkeletons, initAccessibility, initSwiper } from './modules/effects.js';

// DOM Ready helper
const ready = (callback) => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

// Initialize all modules
ready(() => {
  // Page load animation
  document.body.classList.add("loaded");

  // Core functionality
  initNavigation();
  initBackToTop();

  // Animations
  initScrollReveal();
  initCounterAnimation();
  initParallax();
  initTiltEffect();
  initDataAnimations();

  // Gallery
  initGalleryFilters();
  initLightbox();

  // Form
  initFormValidation();

  // Effects
  initTypingEffect();
  initMagneticButtons();
  initScrollProgress();
  initWhatsAppPulse();
  initImageSkeletons();
  initAccessibility();
  initSwiper();

  console.log("🏠 iDesigns website loaded successfully!");
});
