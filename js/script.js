document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navLinks = document.querySelectorAll('.nav-link');
  const navLinksMobile = document.querySelectorAll('.nav-link-mobile');
  const sections = document.querySelectorAll('.section');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scrollspy: highlight active nav link based on visible section
  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
    navLinksMobile.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

  // Interactive detection demos (drag slider to reveal bounding box)
  document.querySelectorAll('.compare-container').forEach(initCompareDemo);

  function initCompareDemo(compareContainer) {
    const slider = compareContainer.querySelector('.compare-slider');
    const bbox = compareContainer.querySelector('.bbox');
    const label = compareContainer.querySelector('.bbox-label');
    if (!slider || !bbox) return;
    let dragging = false;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const positionLabel = () => {
      if (!label || !bbox) return;
      const contRect = compareContainer.getBoundingClientRect();
      const bboxRect = bbox.getBoundingClientRect();
      const left = bboxRect.left - contRect.left;
      const top = bboxRect.top - contRect.top;
      const labelHeight = label.offsetHeight || 20;
      label.style.left = `${Math.max(4, left)}px`;
      label.style.top = `${Math.max(4, top - labelHeight - 6)}px`;
    };

    const setSliderPos = (perc) => {
      slider.style.left = (perc * 100) + '%';
      slider.setAttribute('aria-valuenow', Math.round(perc * 100));

      const containerRect = compareContainer.getBoundingClientRect();
      const bboxRect = bbox.getBoundingClientRect();
      const sliderX = perc * containerRect.width;
      const bboxLeft = bboxRect.left - containerRect.left;
      const bboxRight = bboxLeft + bboxRect.width;

      if (sliderX <= bboxLeft) {
        bbox.style.clipPath = 'inset(0 100% 0 0)';
      } else if (sliderX >= bboxRight) {
        bbox.style.clipPath = 'inset(0 0 0 0)';
      } else {
        const rightInsetPx = bboxRight - sliderX;
        const rightInsetPct = clamp((rightInsetPx / bboxRect.width) * 100, 0, 100);
        bbox.style.clipPath = `inset(0 ${rightInsetPct}% 0 0)`;
      }

      if (label) {
        const labelRect = label.getBoundingClientRect();
        const labelLeft = labelRect.left - containerRect.left;
        const labelRight = labelLeft + labelRect.width;

        if (sliderX <= labelLeft) {
          label.style.opacity = '0';
        } else if (sliderX >= labelRight) {
          label.style.opacity = '1';
        } else {
          label.style.opacity = '1';
        }
      }

      bbox.style.opacity = '1';
    };

    positionLabel();
    window.addEventListener('resize', () => { positionLabel(); setSliderPos(parseFloat(slider.style.left) / 100 || 0.75); });

    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
    });

    document.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const rect = compareContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSliderPos(clamp(x / rect.width, 0, 1));
    });

    document.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      try { slider.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    positionLabel();
    setSliderPos(0.75);
  }
});
