/* ── LIGHTBOX ── */
function baExpand(src, alt) {
  const lb  = document.getElementById('baLightbox');
  const img = document.getElementById('baLightboxImg');
  img.src = src;
  img.alt = alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function baLightboxClose(e) {
  if (e && e.target === document.getElementById('baLightboxImg')) return;
  document.getElementById('baLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') baLightboxClose(); });

/* ── NAVBAR ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── COUNTER ── */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = ts => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(ease * target);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const heroObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(document.getElementById('c2'), 10);
      animateCounter(document.getElementById('c3'), 100);
      heroObs.disconnect();
    }
  });
}, { threshold: 0.3 });
heroObs.observe(document.querySelector('.hero-stats'));

/* ── REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── FAQ ── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── BEFORE / AFTER ── */
function initBA(wrapId, afterId, divId, handleId) {
  const wrap    = document.getElementById(wrapId);
  const after   = document.getElementById(afterId);
  const divider = document.getElementById(divId);
  const handle  = document.getElementById(handleId);
  if (!wrap) return;

  let dragging = false;

  function currentPct() {
    return parseFloat(wrap.dataset.pct || '50');
  }

  function setPos(pct, animated) {
    pct = Math.max(2, Math.min(98, pct));
    wrap.dataset.pct = pct;

    const easeW = animated ? 'width .45s cubic-bezier(.4,0,.2,1)' : 'none';
    const easeP = animated ? 'left .45s cubic-bezier(.4,0,.2,1)' : 'none';

    after.style.transition   = easeW;
    divider.style.transition = easeP;
    handle.style.transition  = easeP;

    after.style.width  = pct + '%';
    divider.style.left = pct + '%';
    handle.style.left  = pct + '%';

    /* repor visibilidade ao arrastar */
    divider.style.opacity = '1';
    handle.style.opacity  = '1';
  }

  function getPct(clientX) {
    const rect = wrap.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  /* ── Drag — mouse ── */
  wrap.addEventListener('mousedown', e => {
    dragging = true;
    setPos(getPct(e.clientX), false);
  });
  window.addEventListener('mousemove', e => {
    if (dragging) setPos(getPct(e.clientX), false);
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  /* ── Drag — touch ── */
  wrap.addEventListener('touchstart', e => {
    dragging = true;
    setPos(getPct(e.touches[0].clientX), false);
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (dragging) setPos(getPct(e.touches[0].clientX), false);
  }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });

  /*
   * ── Click na imagem — anima para o ponto clicado ──
   * Dead-zone à volta do handle para evitar micro-saltos ao soltar o drag.
   */
  wrap.addEventListener('click', e => {
    if (dragging) return;
    const pct = getPct(e.clientX);
    if (Math.abs(pct - currentPct()) < 6) return;
    setPos(Math.round(pct), true);
  });
}

initBA('ba1', 'ba1after', 'ba1div', 'ba1handle');
initBA('ba2', 'ba2after', 'ba2div', 'ba2handle');

/* ── TESTIMONIAL SLIDER ── */
(function () {
  const slider  = document.getElementById('testimonialSlider');
  const dotsCon = document.getElementById('sliderDots');
  const cards   = slider.querySelectorAll('.testimonial-card');
  let current   = 0;

  const perView = () => window.innerWidth < 768 ? 1 : 3;
  const total   = () => Math.ceil(cards.length / perView());

  function buildDots() {
    dotsCon.innerHTML = '';
    for (let i = 0; i < total(); i++) {
      const d = document.createElement('div');
      d.className = 'slider-dot' + (i === current ? ' active' : '');
      d.onclick = () => goTo(i);
      dotsCon.appendChild(d);
    }
  }

  function goTo(idx) {
    current = idx;
    const pv = perView();
    const w  = cards[0].offsetWidth + 24;
    slider.style.transform = `translateX(-${current * pv * w}px)`;
    dotsCon.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
  setInterval(() => goTo((current + 1) % total()), 5000);
})();

/* ── PROJECTS CAROUSEL ── */
(function () {
  const track   = document.getElementById('projectsTrack');
  if (!track) return;
  const dotsCon = document.getElementById('projectsDots');
  const cards   = Array.from(track.querySelectorAll('.project-card'));
  let current   = 0;
  let autoTimer;

  const perView = () => window.innerWidth < 768 ? 1 : 2;
  const total   = () => Math.ceil(cards.length / perView());

  function buildDots() {
    dotsCon.innerHTML = '';
    for (let i = 0; i < total(); i++) {
      const d = document.createElement('div');
      d.className = 'projects-dot' + (i === current ? ' active' : '');
      d.onclick   = () => { goTo(i); startAuto(); };
      dotsCon.appendChild(d);
    }
  }

  function goTo(idx) {
    const t = total();
    current = ((idx % t) + t) % t;
    const pv    = perView();
    const cardW = cards[0].offsetWidth;
    const gap   = parseFloat(getComputedStyle(track).gap) || 24;
    track.style.transform = `translateX(-${current * pv * (cardW + gap)}px)`;
    dotsCon.querySelectorAll('.projects-dot')
      .forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('projectsPrev').addEventListener('click', () => { goTo(current - 1); startAuto(); });
  document.getElementById('projectsNext').addEventListener('click', () => { goTo(current + 1); startAuto(); });

  const wrap = document.getElementById('projectsCarousel');
  wrap.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrap.addEventListener('mouseleave', startAuto);

  buildDots();
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
})();

/* ── SUCCESS TOAST ── */
function showToast() {
  const toast = document.getElementById('toast-success');
  toast.classList.add('show');
  setTimeout(closeToast, 5000);
}

function closeToast() {
  document.getElementById('toast-success').classList.remove('show');
}

/* ── CONTACT FORM AJAX ── */
(function () {
  const form = document.querySelector('form.contact-form-wrap');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (form.querySelector('[name="_honey"]').value) return;

    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('https://formsubmit.co/ajax/alfaomegasolutionforyou@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:          form.querySelector('[name="name"]').value,
          email:         form.querySelector('[name="email"]').value,
          phone:         form.querySelector('[name="phone"]').value,
          project_type:  form.querySelector('[name="project_type"]').value,
          message:       form.querySelector('[name="message"]').value,
          _subject:      'New Quote Request – Elevated Painting',
          _template:     'table',
          _captcha:      'false',
          _autoresponse: 'Thank you for reaching out to Elevated Painting! We received your quote request and will get back to you within 24 hours with a detailed estimate. — The Elevated Painting Team',
        }),
      });

      if (res.ok) {
        form.reset();
        showToast();
      } else {
        btn.textContent = 'Error — try again';
        setTimeout(() => { btn.disabled = false; btn.textContent = originalText; }, 3000);
        return;
      }
    } catch {
      btn.textContent = 'Error — try again';
      setTimeout(() => { btn.disabled = false; btn.textContent = originalText; }, 3000);
      return;
    }

    btn.disabled = false;
    btn.textContent = originalText;
  });
})();

/* ── PROCESS ── */
document.querySelectorAll('.process-step').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.process-step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});