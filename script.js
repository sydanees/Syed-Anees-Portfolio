// Preloader: types a short design quote, backspaces it if the page is still
// loading once it finishes, and settles on the real positioning line the
// moment the page is actually ready.
(function preloader() {
  const el = document.getElementById('preloader');
  const textEl = document.getElementById('preloader-text');
  if (!el || !textEl) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finish = () => {
    document.body.classList.remove('is-preloading');
    el.classList.add('is-hidden');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  };
  if (reduce) { finish(); return; }

  const quotes = [
    'Good design is as little design as possible. Dieter Rams',
    'Details are not the details. They make the design. Charles Eames',
    'Simplicity is the ultimate sophistication. Leonardo da Vinci',
  ];
  const finalLine = "I make expensive problems disappear.";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let pageLoaded = false;
  window.addEventListener('load', () => { pageLoaded = true; }, { once: true });

  async function type(str, speed) {
    for (let i = 1; i <= str.length; i++) {
      textEl.textContent = str.slice(0, i);
      await sleep(speed);
    }
  }
  async function erase(str, speed) {
    for (let i = str.length; i >= 0; i--) {
      textEl.textContent = str.slice(0, i);
      await sleep(speed);
    }
  }

  (async () => {
    let i = 0;
    // Cycle quotes, backspacing between them, until the page is actually
    // ready; never cut a word off mid-type.
    while (!pageLoaded && i < quotes.length * 3) {
      const quote = quotes[i % quotes.length];
      await type(quote, 28);
      await sleep(500);
      if (pageLoaded) break;
      await erase(quote, 14);
      i++;
    }
    if (!textEl.textContent) await type(finalLine, 28);
    else { await erase(textEl.textContent, 14); await type(finalLine, 28); }
    await sleep(400);
    finish();
  })();
})();

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
