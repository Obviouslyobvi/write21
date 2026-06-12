// Nonfiction Blueprint - Landing Page Interactions
// Headline rotation removed 2026-06-11: one promise, stated once, kept all the way down the page.
// Email-capture form removed from hero: primary CTA is now the LemonSqueezy checkout.

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
