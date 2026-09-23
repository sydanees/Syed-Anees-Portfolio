(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const TAU = Math.PI * 2;

  /* ---- scalloped badge ---- */
  const scallop = (cx, cy, r, n) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * TAU, a1 = ((i + .5) / n) * TAU, a2 = ((i + 1) / n) * TAU;
      const x0 = cx + Math.cos(a0) * r,        y0 = cy + Math.sin(a0) * r;
      const xc = cx + Math.cos(a1) * r * 1.34, yc = cy + Math.sin(a1) * r * 1.34;
      const x2 = cx + Math.cos(a2) * r,        y2 = cy + Math.sin(a2) * r;
      if (i === 0) d += `M${x0.toFixed(2)},${y0.toFixed(2)}`;
      d += `Q${xc.toFixed(2)},${yc.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`;
    }
    return d + 'Z';
  };
  const starPath = document.getElementById('starPath');
  if (starPath) starPath.setAttribute('d', scallop(50, 50, 38, 13));
  document.querySelectorAll('.pill__arrow path').forEach(p => p.style.setProperty('--len', Math.ceil(p.getTotalLength())));

  /* ---- badge tags ---- */
  const TAGS = [
    { t: 'Systems',    x: -2.05, y: -1.35, r: -7, d: 0   },
    { t: 'AI',         x: -1.85, y: -0.45, r: -4, d: 90  },
    { t: 'SaaS',       x: -0.80, y: -0.95, r:  3, d: 45  },
    { t: 'CX',         x: -0.60, y: -1.95, r:  4, d: 130 },
    { t: 'Enterprise', x:  0.92, y: -1.60, r:  6, d: 175 },
    { t: '0 → 1',      x:  0.70, y: -0.58, r:  8, d: 215 }
  ];
  const badgeEl = document.getElementById('badge'), tagWrap = document.getElementById('tags');
  if (badgeEl && tagWrap) {
    tagWrap.innerHTML = TAGS.map(g => `<span class="tag" style="--tr:${g.r}deg;--d:${g.d}">${g.t}</span>`).join('');
    const tagEls = [...tagWrap.children];
    const placeTags = () => {
      const u = badgeEl.offsetWidth;
      tagEls.forEach((el, i) => {
        el.style.setProperty('--tx', (TAGS[i].x * u).toFixed(1) + 'px');
        el.style.setProperty('--ty', (TAGS[i].y * u).toFixed(1) + 'px');
      });
    };
    addEventListener('resize', placeTags);
    placeTags();
  }

  /* ---- the expensive problems, placed on depth planes ---- */
  const NOTES = [
    { t:'Churn',                 c:'lime',   x:-6,  y:11, s:1.06, r:-14, z:  30, zEnd: 420, fx: 1, p:0, tr:-3, front:0 },
    { t:'Abandoned tasks',       c:'butter', x: 9,  y:17, s:0.96, r: 11, z: -40, zEnd:-280, fx:-1, p:1, tr: 2, front:0 },
    { t:'Complex onboarding',    c:'sky',    x:88,  y: 1, s:1.02, r: 13, z:  15, zEnd: 300, fx: 1, p:2, tr:-2, front:0, opt:1 },
    { t:'Drop-off',              c:'butter', x:69,  y:14, s:0.96, r: -9, z: -30, zEnd:-320, fx: 1, p:0, tr: 3, front:0 },
    { t:'Low activation',        c:'lime',   x:83,  y:28, s:0.99, r: 16, z:  25, zEnd: 360, fx:-1, p:1, tr:-3, front:0 },
    { t:'High support costs',    c:'butter', x:-9,  y:57, s:1.28, r: -7, z: 190, zEnd: 760, fx: 1, p:2, tr: 4, front:1 },
    { t:'Feature confusion',     c:'sky',    x: 9,  y:62, s:0.93, r: 15, z:  55, zEnd:-240, fx:-1, p:0, tr:-4, front:0, opt:1 },
    { t:'Inconsistent experience',c:'sky',   x:65,  y:66, s:0.97, r: -6, z:  80, zEnd: 300, fx: 1, p:1, tr: 2, front:0 },
    { t:'Low retention',         c:'lime',   x:77,  y:63, s:1.24, r: 14, z: 205, zEnd: 800, fx:-1, p:2, tr:-5, front:1 }
  ];

  const back = document.getElementById('notesBack'), front = document.getElementById('notesFront');
  if (back && front) {
    const html = n => `<div class="note" data-opt="${n.opt || 0}" data-paper="${n.p}" style="
        left:${n.x}%;top:${n.y}%;--s:${n.s};--i:${n.i};--fx:${n.fx};
        --tint:var(--note-${n.c});--tr:${n.tr}deg">
        <div class="note__shadow"></div>
        <div class="note__paper"><div class="note__face"></div><span class="note__text">${n.t}</span></div>
      </div>`;
    NOTES.forEach((n, i) => n.i = i);
    back.innerHTML  = NOTES.filter(n => !n.front).map(html).join('');
    front.innerHTML = NOTES.filter(n =>  n.front).map(html).join('');

    const order = [...NOTES.filter(n => !n.front), ...NOTES.filter(n => n.front)];
    const outers = [...back.children, ...front.children];
    const papers = outers.map(o => o.querySelector('.note__paper'));
    const shadows = outers.map(o => o.querySelector('.note__shadow'));

    const st = order.map((n, k) => ({
      base:n.r, z0:n.z, zEnd:n.zEnd,
      phase:k * 1.73,
      swayF:1.4 + (k % 3) * .5,
      swayA:90 + (k % 4) * 42,
      spinY:(k % 2 ? 1 : -1) * (150 + (k % 3) * 80),
      spinZ:(k % 2 ? -1 : 1) * (40 + (k % 4) * 26),
      driftX:(n.x < 50 ? -1 : 1) * (70 + (k % 3) * 55),
      driftY:180 + (k % 4) * 130,
      tilt:0, vTilt:0, swing:0, vSwing:0, lift:0,
      prevX:0, prevY:0, prevS:1, warm:false,
      cx:0, cy:0
    }));

    const measure = () => {
      const b = back.getBoundingClientRect();
      const left = b.left + scrollX, top = b.top + scrollY;
      outers.forEach((el, i) => {
        st[i].cx = el.offsetLeft + el.offsetWidth / 2 + left;
        st[i].cy = el.offsetTop + el.offsetHeight * .72 + top;
      });
    };
    measure();
    addEventListener('resize', measure);

    let px = -9999, py = -9999;
    if (!coarse) {
      addEventListener('pointermove', e => { px = e.clientX + scrollX; py = e.clientY + scrollY; }, { passive:true });
      addEventListener('pointerleave', () => { px = py = -9999; }, { passive:true });
    }

    const R = 260, K = .14, D = .80;
    const FOCUS = 20;
    let p = 0;
    let vanish = 0, vanishTo = 0;
    const heroEl = document.getElementById('hero');

    const frame = () => {
      const heroH = heroEl.offsetHeight;
      p += (clamp(scrollY / (heroH * .9), 0, 1) - p) * .10;
      vanish += (vanishTo - vanish) * .12;

      const detach = smooth(0, .15, p);
      const fly    = smooth(.05, 1, p);
      const flying = p > .002;

      for (let i = 0; i < outers.length; i++) {
        const s = st[i];
        let tTilt = 0, tSwing = 0, infl = 0;

        if (!reduce && !flying && px > -9000) {
          const dx = px - s.cx, dy = py - s.cy;
          const dist = Math.hypot(dx, dy);
          if (dist < R) {
            infl = (1 - dist / R) ** 2;
            tTilt  = infl * 17;
            tSwing = -Math.sign(dx) * infl * 7;
          }
        }
        s.vTilt  = (s.vTilt  + (tTilt  - s.tilt)  * K) * D; s.tilt  += s.vTilt;
        s.vSwing = (s.vSwing + (tSwing - s.swing) * K) * D; s.swing += s.vSwing;
        s.lift  += (infl - s.lift) * .16;

        const sway = Math.sin(fly * TAU * s.swayF + s.phase) * s.swayA * fly;
        const x  = s.driftX * fly + sway;
        const y  = s.driftY * fly;
        const z  = s.z0 + (s.zEnd - s.z0) * fly + detach * 26;
        const rz = s.base + s.spinZ * fly + Math.sin(fly * TAU * s.swayF * 1.3 + s.phase) * 11 * fly;
        const ry = s.spinY * fly;

        const persp = 1300, pScale = persp / (persp - z);
        const sx = x * pScale, sy = y * pScale;
        let speed = 0;
        if (s.warm) speed = Math.hypot(sx - s.prevX, sy - s.prevY);
        s.prevX = sx; s.prevY = sy; s.warm = true;

        const v = smooth(i * .035, 1, vanish);

        const dof = Math.max(0, z - FOCUS) / 17 + Math.max(0, FOCUS - z) / 70;
        let blur = Math.min(dof + Math.min(speed * .30, 9) + v * 10, 26);
        blur = Math.round(blur * 2) / 2;

        outers[i].style.transform =
          `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) ` +
          `rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(2)}deg) ` +
          `scale(${(1 - v * .07).toFixed(3)})`;
        outers[i].style.filter = blur > .25 ? `blur(${blur}px)` : 'none';
        outers[i].style.opacity = ((1 - smooth(.6, 1, p)) * (1 - v)).toFixed(3);

        papers[i].style.transform =
          `perspective(620px) rotateX(${s.tilt.toFixed(2)}deg) rotateZ(${s.swing.toFixed(2)}deg) ` +
          `scale(${(1 + s.lift * .026).toFixed(3)})`;

        shadows[i].style.opacity = (.3 + s.lift * .22).toFixed(3);
        shadows[i].style.transform =
          `scaleX(var(--fx)) translateY(${(9 + s.lift * 20).toFixed(1)}px) scale(${(.985 + s.lift * .03).toFixed(3)})`;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    const trigger = document.getElementById('trigger');
    if (trigger) {
      trigger.addEventListener('pointerenter', () => vanishTo = 1);
      trigger.addEventListener('pointerleave', () => vanishTo = 0);
      trigger.addEventListener('focus', () => vanishTo = 1);
      trigger.addEventListener('blur',  () => vanishTo = 0);
      if (coarse) trigger.addEventListener('click', () => vanishTo = vanishTo ? 0 : 1);
    }
  }

  /* ---- tap / keyboard fallbacks for pill + badge ---- */
  ['pill', 'badge'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const toggle = () => el.classList.toggle('is-open');
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  /* ---- nav pip + scroll spy ---- */
  const nav = document.getElementById('nav'), pip = document.getElementById('pip');
  if (nav && pip) {
    const items = [...nav.querySelectorAll('.nav__item')];
    let active = items[0];
    const place = el => { pip.style.width = el.offsetWidth + 'px'; pip.style.transform = `translateX(${el.offsetLeft}px)`; };
    place(active);
    addEventListener('resize', () => place(active));
    items.forEach(el => {
      el.addEventListener('pointerenter', () => place(el));
      el.addEventListener('focus', () => place(el));
    });
    nav.addEventListener('pointerleave', () => place(active));

    const sections = items
      .map(el => ({ el, target: document.querySelector(el.getAttribute('href')) }))
      .filter(x => x.target);

    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const match = sections.find(s => s.target === entry.target);
          if (!match) return;
          items.forEach(i => i.removeAttribute('aria-current'));
          match.el.setAttribute('aria-current', 'page');
          active = match.el;
          place(active);
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(s => spy.observe(s.target));
    }
  }

  /* ---- reveal on scroll: case studies + generic .reveal blocks ---- */
  const revealTargets = document.querySelectorAll('.case, .reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- scroll cue dismiss ---- */
  const hint = document.getElementById('hint');
  if (hint) {
    const dismiss = () => hint.classList.add('is-gone');
    addEventListener('scroll', dismiss, { once:true, passive:true });
    setTimeout(dismiss, 9000);
  }
})();
