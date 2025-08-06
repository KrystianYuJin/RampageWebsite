// ...existing code...
// Animation for banner and features
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature, .benefit, .stat, .testimonial, .images img');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Button pulse effect on main banner
const mainBtn = document.querySelector('.main-banner .btn, .btn');
if (mainBtn) {
  mainBtn.addEventListener('mouseenter', () => {
    mainBtn.style.animation = 'popIn 0.5s';
  });
  mainBtn.addEventListener('mouseleave', () => {
    mainBtn.style.animation = '';
  });
}
// ...existing code...
