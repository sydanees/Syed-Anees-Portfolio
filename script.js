// Header crosses into "on dark" state while the Work section is behind it.
const workSection = document.getElementById('work');
if (workSection && 'IntersectionObserver' in window) {
  const header = document.querySelector('.site-header');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        document.body.classList.toggle('on-dark', entry.isIntersecting);
      });
    },
    { rootMargin: '-72px 0px -85% 0px' }
  );
  observer.observe(workSection);
}

// Before/after compare sliders (case-study pages).
document.querySelectorAll('.compare').forEach((el) => {
  const input = el.querySelector('input[type="range"]');
  const after = el.querySelector('.pane.after');
  if (!input || !after) return;
  const update = () => el.style.setProperty('--split', `${input.value}%`);
  input.addEventListener('input', update);
  update();
});
