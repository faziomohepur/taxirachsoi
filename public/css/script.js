// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Animated stat counters (trigger once when visible)
const statEls = document.querySelectorAll('.stat__num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString('vi-VN');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (statEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statEls.forEach((el) => observer.observe(el));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Chặn chuột phải
  document.addEventListener('contextmenu', event => event.preventDefault());

  // Chặn các phím tắt F12, Ctrl+U, Ctrl+Shift+I
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
    }
  });
<!-- End Anti Copy Source -->

// FIXED: Hiển thị tên khách và mã đơn từ URL ?ten=&booking_id=
  (function(){
    const p = new URLSearchParams(window.location.search);
    const ten = p.get('ten');
    const id = p.get('booking_id');
    const diem = p.get('diem');
    const loai = p.get('loai');
    const el = document.getElementById('customerInfo');
    const title = document.getElementById('thankTitle');
    
    if (ten && el) {
      let txt = 'Cảm ơn anh/chị ' + ten;
      if (id) txt += ' • Mã đơn: ' + id;
      el.textContent = txt;
    } else if (id && el) {
      el.textContent = 'Mã đơn của bạn: ' + id;
    }

    // Nếu có điểm đi, hiện thêm vào đoạn p đầu
    if (diem) {
      const firstP = document.querySelector('.card p');
      if (firstP) {
        firstP.innerHTML += '<br><span style="color:#1f1b15">Tuyến: <strong>' + diem + '</strong>' + (loai ? ' • ' + loai : '') + '</span>';
      }
    }

    // Google Ads / GTM conversion event nếu có
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'booking_success', booking_id: id, customer_name: ten });
    }
  })();