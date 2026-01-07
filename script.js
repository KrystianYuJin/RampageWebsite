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
  initScrollArrow();
  initEmailReveal();
  initTrialButtons();
  initContactSalesButton();
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
  const forms = document.querySelectorAll(".contact-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");
    const updateCounter = setupCharacterCounter(form);

    // Add real-time validation
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearErrorOnType);
    });

    form.addEventListener("submit", (event) => handleFormSubmit(event, updateCounter));
  });
}

function setupCharacterCounter(form) {
  const textarea = form.querySelector("textarea[maxlength]");
  if (!textarea) return null;

  const counterWrapper = form.querySelector(`[data-counter-for="${textarea.id}"]`);
  const counterSpan = counterWrapper ? counterWrapper.querySelector("span") : null;
  if (!counterWrapper || !counterSpan) return null;

  const maxLength = parseInt(textarea.getAttribute("maxlength"), 10) || 0;

  const updateCounter = () => {
    const currentLength = textarea.value.length;
    counterSpan.textContent = currentLength;

    if (!maxLength) return;

    if (currentLength > maxLength * 0.9) {
      counterSpan.style.color = "#ef4444";
    } else if (currentLength > maxLength * 0.75) {
      counterSpan.style.color = "#f59e0b";
    } else {
      counterSpan.style.color = "#64748b";
    }
  };

  textarea.addEventListener("input", updateCounter);
  updateCounter();

  return updateCounter;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  // Remove existing error styling
  field.classList.remove("error");

  // Validate based on field type
  let isValid = true;
  let errorMessage = "";

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
    errorMessage = "Please enter a valid email address";
  } else if (["name", "business_name", "company_name", "contact_name"].includes(field.name) && value) {
    // Name validation - no special characters except spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!nameRegex.test(value)) {
      isValid = false;
      errorMessage = "Business name contains invalid characters";
    } else if (value.length < 2) {
      isValid = false;
      errorMessage = "Business name must be at least 2 characters";
    }
  } else if (field.name === "message" && value) {
    // Message validation - check for suspicious content
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /onload=/i,
      /onclick=/i,
      /<iframe/i,
      /\[url=/i,
      /\[link=/i,
      /http[s]?:\/\/[^\s]+\.(tk|ml|ga|cf|bit\.ly|tinyurl)/i
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(value));
    if (isSuspicious) {
      isValid = false;
      errorMessage = "Message contains invalid content";
    } else if (value.length < 10) {
      isValid = false;
      errorMessage = "Please provide more details (minimum 10 characters)";
    }
  }

  if (!isValid) {
    field.classList.add("error");
    showFieldError(field, errorMessage);
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

function showFieldError(field, message = "This field is required") {
  const errorId = field.id + "-error";
  let errorElement = document.getElementById(errorId);

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = errorId;
    errorElement.className = "field-error";
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }

  let errorMessage = message;
  if (field.type === "email" && message === "This field is required") {
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

async function handleFormSubmit(e, updateCounter) {
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
    await submitFormspreeForm(form, updateCounter);
  }
}

async function submitFormspreeForm(form, updateCounter) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  submitButton.style.opacity = '0.7';
  
  try {
    // Check honeypot field for spam protection
    const honeypot = form.querySelector('input[name="_gotcha"]').value;
    
    if (honeypot) {
      throw new Error('Spam detected');
    }

    // Rate limiting check
    if (!checkRateLimit()) {
      throw new Error('Too many requests. Please wait before submitting again.');
    }

    // Submit to Formspree
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showSuccessMessage("Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.");
      form.reset();
      if (typeof updateCounter === "function") {
        updateCounter();
      }
      updateRateLimit();
    } else {
      const errorData = await response.json();
      if (errorData.errors) {
        const errorMessages = errorData.errors.map(error => error.message).join(', ');
        throw new Error(errorMessages);
      } else {
        throw new Error('Failed to send message');
      }
    }

  } catch (error) {
    console.error('Form submission error:', error);
    let errorMessage = error.message;
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.message.includes('Spam detected')) {
      errorMessage = 'Submission blocked. Please try again.';
    }
    
    showErrorMessage(errorMessage + ' If the problem persists, please contact us directly at hello@shiftsync.im');
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.opacity = '1';
  }
}

// Rate limiting functions
function checkRateLimit() {
  const lastSubmission = localStorage.getItem('lastContactSubmission');
  const rateLimitWindow = 60000; // 1 minute

  if (lastSubmission) {
    const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
    return timeSinceLastSubmission > rateLimitWindow;
  }
  return true;
}

function updateRateLimit() {
  localStorage.setItem('lastContactSubmission', Date.now().toString());
}

function showSuccessMessage(message = "Your message has been sent successfully! We'll get back to you within 24 hours.") {
  const form = document.querySelector(".contact-form");
  const button = form.querySelector('button[type="submit"]');

  // Create success notification
  const notification = createNotification(message, 'success');
  document.body.appendChild(notification);

  // Animate in notification
  setTimeout(() => notification.classList.add('show'), 100);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Reset form
  setTimeout(() => {
    form.reset();
  }, 1000);
}

function showErrorMessage(message = "Sorry, there was an error sending your message. Please try again later.") {
  const notification = createNotification(message, 'error');
  document.body.appendChild(notification);

  // Animate in notification
  setTimeout(() => notification.classList.add('show'), 100);

  // Remove notification after 6 seconds (longer for error messages)
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 6000);
}

function createNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icon = type === 'success' ? 'check_circle' : 'error';
  const bgColor = type === 'success' 
    ? 'linear-gradient(135deg, #10b981, #059669)' 
    : 'linear-gradient(135deg, #ef4444, #dc2626)';

  notification.innerHTML = `
    <div class="notification-content">
      <span class="material-icons notification-icon">${icon}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <span class="material-icons">close</span>
      </button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    min-width: 300px;
    max-width: 500px;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  `;

  // Add styles for notification content
  const contentStyle = `
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .notification-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    .notification-message {
      flex: 1;
      font-weight: 500;
    }
    .notification-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }
    .notification-close:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .notification-close .material-icons {
      font-size: 1.25rem;
    }
    .notification.show {
      transform: translateX(0);
      opacity: 1;
    }
  `;

  // Add styles to document if not already added
  if (!document.getElementById('notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = contentStyle;
    document.head.appendChild(styleSheet);
  }

  return notification;
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

// Scroll Arrow Functionality
function initScrollArrow() {
  const scrollArrow = document.querySelector('.scroll-down-arrow');
  const featuresSection = document.querySelector('#features');
  
  if (scrollArrow && featuresSection) {
    scrollArrow.addEventListener('click', function() {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

// Email Reveal Functionality (Anti-spam protection)
function initEmailReveal() {
  const emailContainer = document.getElementById('email-container');
  
  if (emailContainer) {
    // Auto-assemble email address on page load
    setTimeout(function() {
      // Obfuscated email parts
      const user = 'ShiftSync';
      const domain = 'rampage';
      const tld = 'im';
      const email = user + '@' + domain + '.' + tld;
      
      // Create mailto link
      const emailLink = document.createElement('a');
      emailLink.href = 'mailto:' + email;
      emailLink.textContent = email;
      emailLink.className = 'text-accent hover:text-accent-bright transition-colors duration-300';
      
      // Replace loading text with email link
      emailContainer.innerHTML = '';
      emailContainer.appendChild(emailLink);
      
      // Add copy to clipboard functionality
      emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(function() {
          // Show success message
          const originalText = emailLink.textContent;
          emailLink.textContent = 'Email copied!';
          emailLink.style.color = '#10b981';
          
          setTimeout(function() {
            emailLink.textContent = originalText;
            emailLink.style.color = '';
          }, 2000);
        }).catch(function() {
          // Fallback: open email client
          window.location.href = emailLink.href;
        });
      });
    }, 500); // Small delay to avoid immediate assembly that bots might detect
  }
}

// Initialize Start Free Trial buttons
function initTrialButtons() {
  // Find all buttons with "Start Free Trial" text
  const trialButtons = Array.from(document.querySelectorAll('button')).filter(button => 
    button.textContent.trim() === 'Start Free Trial'
  );
  
  trialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      const originalText = button.textContent;
      button.textContent = 'Redirecting...';
      button.disabled = true;
      
      // Redirect to scheduler.rampage.im
      setTimeout(() => {
        window.open('https://scheduler.rampage.im', '_blank');
        
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
      }, 500);
    });
  });
}

// Initialize Contact Sales button
function initContactSalesButton() {
  // Find the "Contact Sales" button
  const contactSalesButtons = Array.from(document.querySelectorAll('button')).filter(button => 
    button.textContent.trim() === 'Contact Sales'
  );
  
  contactSalesButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find the contact section
      const contactSection = document.querySelector('#contact');
      
      if (contactSection) {
        // Add visual feedback
        const originalText = button.textContent;
        button.textContent = 'Taking you there...';
        button.disabled = true;
        
        // Smooth scroll to contact section
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Reset button state after scroll
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 1000);
      }
    });
  });
}
