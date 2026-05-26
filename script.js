/* ============================================================
   DHARSHINI PORTFOLIO — script.js
   Sections:
     1. 3D Canvas Background (particles + depth)
     2. Dark Mode (persisted)
     3. Typing Effect
     4. Scroll Animations (IntersectionObserver)
     5. Navbar scroll behaviour
     6. Hamburger Menu
     7. Hero stat count-up
     8. Journal + Slideshow
     9. Internship Accordion
    10. Gallery Modal
    11. Legal Modals (Terms & Privacy)
    12. PDF Modal Overlay (fullscreen, blurred bg, arrow nav)
    13. Custom Cursor
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════
   1. 3D CANVAS BACKGROUND
══════════════════════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: 0, y: 0 };
  const COUNT  = 110;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function isDark() { return document.body.classList.contains('dark'); }

  function particleColor(alpha, z) {
    if (isDark()) {
      const r = Math.round(60  + z * 40);
      const g = Math.round(80  + z * 50);
      const b = Math.round(200 + z * 55);
      return `rgba(${r},${g},${b},${alpha})`;
    } else {
      const r = Math.round(120 + z * 30);
      const g = Math.round(140 + z * 20);
      const b = Math.round(240);
      return `rgba(${r},${g},${b},${alpha})`;
    }
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => {
      const z = Math.random();
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        z,
        vx: (Math.random() - 0.5) * 0.18 * (0.4 + z * 0.6),
        vy: (Math.random() - 0.5) * 0.18 * (0.4 + z * 0.6),
        r:  0.8 + z * 2.2,
      };
    });
  }

  function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18 * ((a.z + b.z) / 2);
          ctx.strokeStyle = particleColor(alpha, (a.z + b.z) / 2);
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawGrid() {
    const alpha = isDark() ? 0.04 : 0.025;
    const cols  = 12, rows = 8;
    ctx.strokeStyle = isDark()
      ? `rgba(79,124,255,${alpha})`
      : `rgba(79,100,200,${alpha})`;
    ctx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo((c / cols) * W, 0);
      ctx.lineTo((c / cols) * W, H);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, (r / rows) * H);
      ctx.lineTo(W, (r / rows) * H);
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => {
      const parallaxX = (mouse.x / W - 0.5) * p.z * 18;
      const parallaxY = (mouse.y / H - 0.5) * p.z * 18;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const alpha = 0.25 + p.z * 0.55;
      ctx.fillStyle = particleColor(alpha, p.z);
      ctx.beginPath();
      ctx.arc(p.x + parallaxX, p.y + parallaxY, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  animate();
})();


/* ══════════════════════════════════════════════════════
   2. DARK MODE
══════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}


/* ══════════════════════════════════════════════════════
   3. TYPING EFFECT
══════════════════════════════════════════════════════ */
const typingEl = document.getElementById('typing');
if (typingEl) {
  const text = 'Documenting My Journey';
  let i = 0;
  function type() {
    if (i < text.length) {
      typingEl.textContent += text[i++];
      setTimeout(type, 44);
    }
  }
  setTimeout(type, 450);
}


/* ══════════════════════════════════════════════════════
   4. SCROLL ANIMATIONS
══════════════════════════════════════════════════════ */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      scrollObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -55px 0px' });

document.querySelectorAll('.fade-up, .section').forEach(el => scrollObserver.observe(el));


/* ══════════════════════════════════════════════════════
   5. NAVBAR
══════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}


/* ══════════════════════════════════════════════════════
   6. HAMBURGER MENU
══════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}


/* ══════════════════════════════════════════════════════
   7. HERO STAT COUNT-UP
══════════════════════════════════════════════════════ */
function countUp(el, target, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 30));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else                 { el.textContent = start; }
  }, 30);
}

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.target), 900);
      });
      statObs.disconnect();
    }
  }, { threshold: 0.5 });
  statObs.observe(statsEl);
}


/* ══════════════════════════════════════════════════════
   8. JOURNAL + SLIDESHOW
══════════════════════════════════════════════════════ */
let currentImages = [];
let currentIndex  = 0;

const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
  const img        = document.getElementById('journal-img');
  const titleEl    = document.getElementById('journal-title');
  const textEl     = document.getElementById('journal-text');
  const prevBtn    = document.querySelector('.prev');
  const nextBtn    = document.querySelector('.next');
  const thumbsCont = document.getElementById('thumbnails');
  const counter    = document.getElementById('slideCounter');

  let autoSlide;

  function renderThumbnails() {
    if (!thumbsCont) return;
    thumbsCont.innerHTML = '';
    currentImages.forEach((src, idx) => {
      const t = document.createElement('img');
      t.src = src; t.alt = `Slide ${idx + 1}`;
      if (idx === currentIndex) t.classList.add('active');
      t.addEventListener('click', () => { currentIndex = idx; updateImage(); });
      thumbsCont.appendChild(t);
    });
  }

  function updateImage() {
    if (img) img.src = currentImages[currentIndex];
    if (counter) counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    thumbsCont?.querySelectorAll('img').forEach((t, i) =>
      t.classList.toggle('active', i === currentIndex)
    );
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    if (currentImages.length < 2) return;
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateImage();
    }, 3500);
  }

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (titleEl) titleEl.textContent = item.dataset.title;
      if (textEl)  textEl.textContent  = item.dataset.text;
      currentImages = item.dataset.images.split(',').map(s => s.trim());
      currentIndex  = 0;
      updateImage(); renderThumbnails(); startAutoSlide();
    });
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
  });
  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
  });

  img?.addEventListener('click', () => openGallery());

  // Initial load — first timeline item
  const first = timelineItems[0];
  if (first) {
	first.classList.add('active');
    currentImages = first.dataset.images.split(',').map(s => s.trim());
    currentIndex  = 0;
    updateImage(); renderThumbnails(); startAutoSlide();
  }
}

/* ══════════════════════════════════════════════════════
   9. INTERNSHIP ACCORDION
══════════════════════════════════════════════════════ */
document.querySelectorAll('.intern-head').forEach(head => {
  head.addEventListener('click', () => {
    document.querySelectorAll('.internship.active').forEach(other => {
      if (other !== head.parentElement) other.classList.remove('active');
    });
    head.parentElement.classList.toggle('active');
  });
});


/* ══════════════════════════════════════════════════════
   10. GALLERY MODAL
══════════════════════════════════════════════════════ */
const galleryModal = document.getElementById('galleryModal');
const modalImg     = document.getElementById('modalImg');
const galleryClose = document.getElementById('galleryClose');
const modalPrev    = document.getElementById('modalPrev');
const modalNext    = document.getElementById('modalNext');

let galleryImages = [];
let galleryIndex  = 0;

function openGallery(startIndex) {
  // Use the full currentImages array from the active slideshow
  galleryImages = currentImages.slice();
  galleryIndex  = (startIndex !== undefined) ? startIndex : currentIndex;
  if (galleryModal && modalImg && galleryImages.length > 0) {
    modalImg.src = galleryImages[galleryIndex];
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeGallery() {
  galleryModal?.classList.remove('open');
  document.body.style.overflow = '';
}

galleryClose?.addEventListener('click', closeGallery);
galleryModal?.addEventListener('click', e => { if (e.target === galleryModal) closeGallery(); });

modalPrev?.addEventListener('click', () => {
  galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  if (modalImg) modalImg.src = galleryImages[galleryIndex];
});
modalNext?.addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  if (modalImg) modalImg.src = galleryImages[galleryIndex];
});

document.addEventListener('keydown', e => {
  const pdfOpen     = document.getElementById('pdfModal')?.classList.contains('open');
  const galleryOpen = galleryModal?.classList.contains('open');
  const legalOpen   = document.getElementById('legalModal')?.classList.contains('open');

  if (e.key === 'Escape') {
    if (pdfOpen)     closePDFModal();
    if (galleryOpen) closeGallery();
    if (legalOpen)   closeLegal();
  }
  if (galleryOpen) {
    if (e.key === 'ArrowLeft')  modalPrev?.click();
    if (e.key === 'ArrowRight') modalNext?.click();
  }
  if (pdfOpen) {
    if (e.key === 'ArrowLeft')  pdfModalPrev();
    if (e.key === 'ArrowRight') pdfModalNext();
  }
});


/* ══════════════════════════════════════════════════════
   11. LEGAL MODALS (Terms & Privacy)
══════════════════════════════════════════════════════ */
const legalModal   = document.getElementById('legalModal');
const legalContent = document.getElementById('legalContent');

window.openLegal = function(type) {
  const tpl = document.getElementById(`tpl-${type}`);
  if (!tpl || !legalContent) return;
  legalContent.innerHTML = '';
  legalContent.appendChild(tpl.content.cloneNode(true));
  legalModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLegal = function() {
  legalModal?.classList.remove('open');
  document.body.style.overflow = '';
};

legalModal?.addEventListener('click', e => {
  if (e.target === legalModal) closeLegal();
});


/* ══════════════════════════════════════════════════════
   12. PDF MODAL OVERLAY
══════════════════════════════════════════════════════ */
let _pdfDoc      = null;
let _pdfPage     = 1;
let _pdfRendering = false;
 
window.openPDFModal = function() {
  const modal = document.getElementById('pdfModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
 
  // Wait for modal to paint so offsetWidth is correct, then load/render
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      _pdfInit();
    });
  });
};
 
window.closePDFModal = function() {
  const modal = document.getElementById('pdfModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
};
 
window.pdfModalPrev = function() {
  if (!_pdfDoc || _pdfPage <= 1 || _pdfRendering) return;
  _pdfPage--;
  _pdfRender(_pdfPage);
};
 
window.pdfModalNext = function() {
  if (!_pdfDoc || _pdfPage >= _pdfDoc.numPages || _pdfRendering) return;
  _pdfPage++;
  _pdfRender(_pdfPage);
};
 
function _pdfShowLoading() {
  const area = document.getElementById('pdfModalCanvas');
  if (area) area.innerHTML =
    '<div class="pdf-loading"><div class="pdf-spinner"></div><p>Loading portfolio\u2026</p></div>';
}
 
function _pdfShowError(msg) {
  const area = document.getElementById('pdfModalCanvas');
  if (area) area.innerHTML =
    '<p style="padding:40px;text-align:center;color:#94a3b8;font-family:sans-serif;font-size:14px">' + msg + '</p>';
  const info = document.getElementById('pdfModalPageInfo');
  if (info) info.textContent = '';
}
 
function _pdfUpdateButtons() {
  const prev = document.getElementById('pdfPrev');
  const next = document.getElementById('pdfNext');
  const info = document.getElementById('pdfModalPageInfo');
  if (!_pdfDoc) return;
  if (prev) prev.disabled = (_pdfPage <= 1);
  if (next) next.disabled = (_pdfPage >= _pdfDoc.numPages);
  if (info) info.textContent = _pdfPage + ' / ' + _pdfDoc.numPages;
}
 
function _pdfRender(num) {
  if (!_pdfDoc || _pdfRendering) return;
  _pdfRendering = true;
 
  _pdfDoc.getPage(num).then(function(page) {
    var area = document.getElementById('pdfModalCanvas');
    if (!area) { _pdfRendering = false; return; }
 
    var isMobile = window.innerWidth <= 768;
 
    // Get actual rendered dimensions of the area
    var areaW = area.getBoundingClientRect().width  || area.offsetWidth  || window.innerWidth;
    var areaH = area.getBoundingClientRect().height || area.offsetHeight || window.innerHeight;
 
    // Fallback for mobile when flex hasn't settled
    if (areaW < 50) areaW = window.innerWidth;
    if (areaH < 50) areaH = window.innerHeight * 0.7;
 
    var padding = isMobile ? 16 : 48;
    var vp1 = page.getViewport({ scale: 1 });
 
    // Scale to fit width, but also ensure height fits
    var scaleW = (areaW - padding) / vp1.width;
    var scaleH = (areaH - padding) / vp1.height;
    var scale  = Math.min(scaleW, scaleH);
 
    // Cap max scale for desktop
    if (!isMobile) scale = Math.min(scale, 820 / vp1.width);
 
    var vp = page.getViewport({ scale: scale });
 
    var canvas    = document.createElement('canvas');
    canvas.width  = Math.floor(vp.width);
    canvas.height = Math.floor(vp.height);
    canvas.style.display = 'block';
 
    area.innerHTML = '';
    area.appendChild(canvas);
 
    page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: vp
    }).promise.then(function() {
      _pdfRendering = false;
      _pdfUpdateButtons();
    }).catch(function(e) {
      console.error('PDF render error:', e);
      _pdfRendering = false;
    });
 
  }).catch(function(e) {
    console.error('PDF getPage error:', e);
    _pdfRendering = false;
    _pdfShowError('Could not render page ' + num + '.');
  });
}
 
function _pdfInit() {
  // If already loaded, just re-render (handles re-open)
  if (_pdfDoc) {
    _pdfRender(_pdfPage);
    return;
  }
 
  if (typeof pdfjsLib === 'undefined') {
    _pdfShowError('PDF.js failed to load. Please refresh the page.');
    return;
  }
 
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';
 
  _pdfShowLoading();
 
  pdfjsLib.getDocument('resources/digital-marketing.pdf').promise.then(function(pdf) {
    _pdfDoc  = pdf;
    _pdfPage = 1;
    _pdfRender(_pdfPage);
  }).catch(function(e) {
    console.error('PDF load error:', e);
    _pdfShowError('Could not load <strong>digital-marketing.pdf</strong>. Refresh the page.');
  });
}
 
// Close on backdrop click
(function() {
  var modal = document.getElementById('pdfModal');
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) closePDFModal();
  });
})();


/* ══════════════════════════════════════════════════════
   13. CUSTOM CURSOR
══════════════════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY  + 'px';
  }, { passive: true });

  const hoverTargets = 'a,button,.card,.timeline-item,.cert-card,.internship,.stat-chip';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width='32px'; cursor.style.height='32px'; cursor.style.opacity='.5'; });
    el.addEventListener('mouseleave', () => { cursor.style.width='16px'; cursor.style.height='16px'; cursor.style.opacity='1'; });
  });
}


/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
 // Back to top button
 const backToTop = document.getElementById('backToTop');
 if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }
});

/* ══════════════════════════════════════════════════════
   EMAILJS CONTACT FORM
══════════════════════════════════════════════════════ */
emailjs.init('ZhhJuP6n1To3AJ2Kg');

window.sendEmail = function() {
  const btn      = document.getElementById('sendBtn');
  const name     = document.querySelector('input[name="name"]').value.trim();
  const email    = document.querySelector('input[name="email"]').value.trim();
  const message  = document.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.send('service_5qnc50h', 'template_g0oyjov', {
    from_name:  name,
    from_email: email,
    message:    message
  })
  .then(function() {
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
    document.getElementById('contactForm').reset();
    setTimeout(() => {
      btn.innerHTML = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  })
  .catch(function(error) {
    console.error('EmailJS error:', error);
    btn.textContent = 'Failed — Try Again';
    btn.style.background = 'linear-gradient(135deg,#ef4444,#f87171)';
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = 'Send Message';
      btn.style.background = '';
    }, 3000);
  });
};