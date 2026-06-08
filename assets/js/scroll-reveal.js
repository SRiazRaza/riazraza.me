(function () {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    document.querySelectorAll('.rr-reveal').forEach(el => el.classList.add('rr-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('rr-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rr-reveal').forEach(el => observer.observe(el));
  });
})();
