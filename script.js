// Modern Shift Sync Website JavaScript
// Enhanced animations and interactions for the modern dark theme

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initScrollAnimations();
  initParallaxEffects();
  initFormHandling();
  initMobileMenu();
  initTypingEffect();
  initCounterAnimations();
  initSmoothScrolling();
  initEnhancedAnimations();
  createFloatingParticles();
});

// Enhanced scroll-triggered animations with stagger effect
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 150);
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations with enhanced targeting
  const animatedElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .testimonial-card, .business-type-card"
  );
  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// Enhanced parallax effects
function initParallaxEffects() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;

    if (scrolled < window.innerHeight) {
      heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// New enhanced animations
function initEnhancedAnimations() {
  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.02) rotateY(5deg)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Add interactive button effects
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
      createRippleEffect(e, button);
    });
  });

  // Add section reveal animations
  const sections = document.querySelectorAll("section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation =
            "sectionSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Create ripple effect for buttons
function createRippleEffect(e, button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
  `;

  button.style.position = "relative";
  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Enhanced form handling with validation
function initFormHandling() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea, select");

  // Add real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearErrorOnType);
  });

  form.addEventListener("submit", handleFormSubmit);
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  // Remove existing error styling
  field.classList.remove("error");

  // Validate based on field type
  let isValid = true;

  if (field.hasAttribute("required") && !value) {
    isValid = false;
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }

  if (!isValid) {
    field.classList.add("error");
    showFieldError(field);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

function clearErrorOnType(e) {
  const field = e.target;
  if (field.classList.contains("error")) {
    field.classList.remove("error");
    clearFieldError(field);
  }
}

function showFieldError(field) {
  const errorId = field.id + "-error";
  let errorElement = document.getElementById(errorId);

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = errorId;
    errorElement.className = "field-error";
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }

  let errorMessage = "This field is required";
  if (field.type === "email") {
    errorMessage = "Please enter a valid email address";
  }

  errorElement.textContent = errorMessage;
  errorElement.style.color = "#ef4444";
  errorElement.style.fontSize = "0.875rem";
  errorElement.style.marginTop = "0.25rem";
}

function clearFieldError(field) {
  const errorId = field.id + "-error";
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.remove();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea, select");
  let isFormValid = true;

  // Validate all fields
  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    showSuccessMessage();
    // Here you would typically send the data to your server
    console.log("Form would be submitted:", new FormData(form));
  }
}

function showSuccessMessage() {
  const form = document.querySelector(".contact-form");
  const button = form.querySelector('button[type="submit"]');

  const originalText = button.textContent;
  button.textContent = "Request Sent! ✓";
  button.style.background = "linear-gradient(135deg, #10b981, #059669)";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = "";
    form.reset();
  }, 3000);
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const nav = document.querySelector("nav ul");

  if (!mobileMenuBtn || !nav) return;

  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("mobile-menu-open");
    const icon = mobileMenuBtn.querySelector(".material-icons");
    icon.textContent = nav.classList.contains("mobile-menu-open")
      ? "close"
      : "menu";
  });
}

// Typing effect for hero text
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-section h1");
  if (!heroTitle) return;

  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// Counter animations for statistics
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-counter]");

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

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-counter"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// Button hover effects
document.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    e.target.style.transform = "translateY(-2px) scale(1.05)";
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    e.target.style.transform = "";
  }
});

// Add floating particles effect to hero section
function createFloatingParticles() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #8b5cf6;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
        `;
    hero.appendChild(particle);
  }
}

// Initialize floating particles after DOM load
setTimeout(createFloatingParticles, 1000);

// Add CSS for floating animation
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .mobile-menu-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--primary-dark);
        padding: 1rem;
        border-top: 1px solid var(--accent-dim);
    }
    
    @media (max-width: 768px) {
        nav ul {
            display: none;
        }
    }
`;
document.head.appendChild(style);
