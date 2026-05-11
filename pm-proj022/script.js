    /* NAVBAR */
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    /* MOBILE MENU */
    function toggleMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
    }

    /* COUNTER */
    function animateCounter(el, target) {
      let start = 0;
      const duration = 1800;
      const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.floor(ease * target);
        if (prog < 1) requestAnimationFrame(step); else el.textContent = target;
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

    /* REVEAL */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* FAQ */
    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

    /* BEFORE/AFTER */
    function initBA(wrapId, afterId, divId, handleId) {
      const wrap = document.getElementById(wrapId);
      const after = document.getElementById(afterId);
      const divider = document.getElementById(divId);
      const handle = document.getElementById(handleId);
      if (!wrap) return;
      let dragging = false;
      const setPos = x => {
        const rect = wrap.getBoundingClientRect();
        const pct = Math.max(5, Math.min(95, (x - rect.left) / rect.width * 100));
        after.style.width = pct + '%';
        divider.style.left = pct + '%';
        handle.style.left = pct + '%';
      };
      wrap.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
      wrap.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
      window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mouseup', () => dragging = false);
      window.addEventListener('touchend', () => dragging = false);
    }
    initBA('ba1', 'ba1after', 'ba1div', 'ba1handle');
    initBA('ba2', 'ba2after', 'ba2div', 'ba2handle');

    /* TESTIMONIAL SLIDER */
    (function () {
      const slider = document.getElementById('testimonialSlider');
      const dotsCon = document.getElementById('sliderDots');
      const cards = slider.querySelectorAll('.testimonial-card');
      let current = 0;
      const perView = () => window.innerWidth < 768 ? 1 : 3;
      const total = () => Math.ceil(cards.length / perView());
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
        const w = cards[0].offsetWidth + 24;
        slider.style.transform = `translateX(-${current * pv * w}px)`;
        dotsCon.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
      }
      buildDots();
      window.addEventListener('resize', () => { buildDots(); goTo(0); });
      setInterval(() => goTo((current + 1) % total()), 5000);
    })();

    /* PROCESS */
    document.querySelectorAll('.process-step').forEach(step => {
      step.addEventListener('click', () => {
        document.querySelectorAll('.process-step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      });
    });