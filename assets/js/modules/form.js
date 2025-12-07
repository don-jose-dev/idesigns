/**
 * Form Module
 * Form validation and submission handling
 */

export function initFormValidation() {
  const consultationForm = document.getElementById("consultationForm");
  
  if (!consultationForm) return;

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

