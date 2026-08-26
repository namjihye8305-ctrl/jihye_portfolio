/* ─────────────────────────────────────────────────────────
   PORTFOLIO INTERACTIONS
   Current structure preserved · JS-only interactions
   ───────────────────────────────────────────────────────── */

// 0. AUTO PROJECT COUNT (.proj-ph 플레이스홀더는 제외하고 실제 .project만 카운트)
document.querySelectorAll('.works-head-r').forEach(el => {
  const count = document.querySelectorAll('.project').length;
  el.textContent = count + (count === 1 ? ' PROJECT' : ' PROJECTS');
});

// 1. SMOOTH SCROLL
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  
  e.preventDefault();
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// 2. SCROLL TRIGGER ANIMATION
// 기본 상태에서 내용을 숨기지 않도록 변경했습니다.
document.querySelectorAll('.project, .about, .proj-ph').forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// 3. PROJECT HOVER EFFECTS
// 아주 긴 이미지(05프로젝트 mo_1, .img-link-tall)는 같은 확대율이라도 절대 픽셀 이동량이 커서
// 과하게 느껴지므로 확대폭을 작게 유지하고, 나머지 랜딩 이미지(.img-link)는 더 크게 확대합니다.
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('mouseenter', function() {
    const images = this.querySelectorAll('.v-pc img, .v-mo img');
    images.forEach(img => {
      let scale = '1.02';
      if (img.closest('.img-link-tall')) scale = '1.015';
      else if (img.closest('.img-link')) scale = '1.05';
      img.style.transform = `scale(${scale})`;
      img.style.transition = 'transform 0.4s ease-out';
    });
  });

  project.addEventListener('mouseleave', function() {
    const images = this.querySelectorAll('.v-pc img, .v-mo img');
    images.forEach(img => {
      img.style.transform = 'scale(1)';
    });
  });
});

// 4. TAG INTERACTIVE HIGHLIGHT
document.querySelectorAll('.proj-tag, .hero-skill').forEach(tag => {
  tag.style.cursor = 'pointer';
  tag.style.transition = 'all 0.3s ease';
  
  tag.addEventListener('mouseenter', function() {
    this.style.borderColor = '#aaa';
    this.style.color = '#e8e8e4';
    this.style.backgroundColor = 'rgba(51, 51, 51, 0.4)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.borderColor = '#333';
    this.style.color = '#888';
    this.style.backgroundColor = 'transparent';
  });
});

// 5. PLACEHOLDER PROJECTS INTERACTION
document.querySelectorAll('.proj-ph').forEach((ph, index) => {
  ph.addEventListener('mouseenter', function() {
    this.style.opacity = '0.7';
    this.style.backgroundColor = 'rgba(30, 30, 30, 0.3)';
  });
  
  ph.addEventListener('mouseleave', function() {
    this.style.opacity = '0.3';
    this.style.backgroundColor = 'transparent';
  });
});

// 7. SMOOTH FADE-IN ON PAGE LOAD
window.addEventListener('load', function() {
  const wrap = document.querySelector('.wrap');
  if (wrap) {
    wrap.style.animation = 'fadeInPage 0.8s ease-out';
  }
});

// 8. ADD CSS FOR ANIMATIONS
if (!document.querySelector('style[data-interactions]')) {
  const style = document.createElement('style');
  style.setAttribute('data-interactions', 'true');
  style.textContent = `
    @keyframes fadeInPage {
      from {
        opacity: 0.95;
      }
      to {
        opacity: 1;
      }
    }
    
    .wrap {
      transition: opacity 0.3s ease;
    }
    
    .about-contacts a {
      position: relative;
      overflow: hidden;
    }
    
    .about-contacts a::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -100%;
      width: 100%;
      height: 1px;
      background: currentColor;
      transition: left 0.3s ease;
    }
    
    .about-contacts a:hover::before {
      left: 0;
    }
  `;
  document.head.appendChild(style);
}

// 9. DEVICE IMAGE INTERACTION
// pc/mo 이미지의 원본 표현을 유지하기 위해 hover 밝기 효과를 제거했습니다.
document.querySelectorAll('.v-pc img, .v-mo img').forEach(img => {
  img.style.cursor = img.closest('a') ? 'pointer' : 'default';
});

// 10. COLOR SWATCH INTERACTION
document.querySelectorAll('.sw').forEach(swatch => {
  swatch.style.cursor = 'pointer';
  swatch.style.transition = 'all 0.2s ease';
  
  swatch.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.3)';
    this.style.boxShadow = `0 4px 16px ${this.style.backgroundColor}80`;
  });
  
  swatch.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
});

// 11. NAVIGATION SETUP (if nav is added dynamically)
const setupNav = function() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
};

if (document.querySelector('nav')) {
  setupNav();
}

// 12. ACTIVE SECTION TRACKING (on scroll)
const sections = document.querySelectorAll('.hero, .works-head, .project, .about');
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.id || section.className;
    }
  });
});

// 13. TOUCH EVENTS FOR MOBILE
document.addEventListener('touchstart', function(e) {
  if (e.target.classList.contains('proj-tag') || 
      e.target.classList.contains('hero-skill') ||
      e.target.classList.contains('sw')) {
    e.target.style.opacity = '0.7';
  }
}, false);

document.addEventListener('touchend', function(e) {
  if (e.target.classList.contains('proj-tag') || 
      e.target.classList.contains('hero-skill') ||
      e.target.classList.contains('sw')) {
    e.target.style.opacity = '1';
  }
}, false);

// 14. STAT HIGHLIGHT SWEEP (scroll-triggered, plays once)
const statHighlights = document.querySelectorAll('.stat-highlight');
if (statHighlights.length && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statHighlights.forEach(el => statObserver.observe(el));
} else {
  statHighlights.forEach(el => el.classList.add('is-visible'));
}

// 15. RESUME HERO LETTER WIGGLE AFTER RETURNING FROM A BACKGROUND TAB
// (일부 브라우저가 백그라운드 탭에서 CSS 애니메이션 렌더링을 멈춘 뒤,
//  복귀 시 제대로 재개하지 않는 경우가 있어 강제로 nudge 해줌)
document.addEventListener('visibilitychange', function() {
  if (document.hidden) return;
  document.querySelectorAll('.hero-left h1 .letter').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    void el.offsetWidth;
    el.style.animationPlayState = 'running';
  });
});

// 16. ALIGN "CASE 02" TEXT BLOCK WITH THE MATCHING DIVIDER IN THE IMAGE COLUMN
// (텍스트/이미지 컬럼의 실제 렌더링 높이가 이미지 비율에 따라 달라지므로
//  고정 margin 대신 실제 위치를 측정해서 맞춥니다.)
const CASE02_EXTRA_OFFSET = 20; // 정확히 맞춘 위치에서 추가로 더 내리는 여백

function alignCase02Divider() {
  const left = document.getElementById('case02-divider-left');
  const right = document.getElementById('case02-divider-right');
  if (!left || !right) return;

  right.style.marginTop = '';
  const leftTop = left.getBoundingClientRect().top + window.scrollY;
  const rightTop = right.getBoundingClientRect().top + window.scrollY;
  const diff = leftTop - rightTop;
  right.style.marginTop = (Math.max(diff, 0) + CASE02_EXTRA_OFFSET) + 'px';
}

window.addEventListener('load', alignCase02Divider);
window.addEventListener('resize', alignCase02Divider);
document.querySelectorAll('.v-pc img').forEach(img => {
  if (!img.complete) img.addEventListener('load', alignCase02Divider);
});

// 17. MOBILE: MOVE SITE-TOOLS INTO HERO (REPLACING THE "2021 - 2026" DATE)
// 모바일에서는 인트로 영역 공간이 부족하므로, 히어로의 "2021 - 2026" 텍스트를 숨기고
// 그 자리에 Full Portfolio Links 옆에 있던 툴 아이콘을 옮겨서 보여줍니다.
function placeSiteToolsForViewport() {
  const tools = document.querySelector('.site-tools');
  const heroYear = document.querySelector('.hero-year');
  const heroRight = document.querySelector('.hero-right');
  const linksTop = document.querySelector('.portfolio-links-top');
  if (!tools || !heroYear || !heroRight || !linksTop) return;

  const isMobile = window.matchMedia('(max-width: 820px)').matches;
  if (isMobile) {
    heroYear.style.display = 'none';
    if (tools.parentElement !== heroRight) {
      heroRight.appendChild(tools);
    }
  } else {
    heroYear.style.display = '';
    if (tools.parentElement !== linksTop) {
      linksTop.appendChild(tools);
    }
  }
}

window.addEventListener('load', placeSiteToolsForViewport);
window.addEventListener('resize', placeSiteToolsForViewport);

// 18. IMAGE LIGHTBOX (click a project image to view it at full size)
// 외부 링크(.img-link)로 감싸진 이미지는 기존 클릭-이동 동작을 그대로 유지하고,
// 나머지 프로젝트 이미지에만 라이트박스를 적용합니다.
(function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  document.querySelectorAll('.v-pc img, .v-mo img').forEach(img => {
    if (img.closest('a')) return;
    img.classList.add('lightbox-zoomable');
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      openLightbox(this);
    });
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightboxImg) { closeLightbox(); return; }
    if (e.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

// 19. CASE 01 (Peachy Den) VIDEO: UNMUTE ONLY WHILE SCROLLED INTO VIEW
// 자동재생 정책 때문에 muted로 시작하고, 화면에 절반 이상 보일 때만 소리를 켭니다.
// 브라우저가 음소거 해제 재생을 막으면서 영상 자체를 정지시키는 경우가 있어,
// play()가 실패하면 다시 muted로 되돌려 영상만이라도 계속 재생되게 합니다.
(function setupCase01VideoSound() {
  const video = document.getElementById('case01-video');
  if (!video || !('IntersectionObserver' in window)) return;

  function keepPlaying() {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function() {
        video.muted = true;
        video.play().catch(function() {});
      });
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      video.muted = !entry.isIntersecting;
      keepPlaying();
    });
  }, { threshold: 0.6 });

  observer.observe(video);
})();

console.log('✓ Portfolio interactions loaded');
