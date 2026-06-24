/* ─────────────────────────────────────────────────────────
   PORTFOLIO INTERACTIONS
   Current structure preserved · JS-only interactions
   ───────────────────────────────────────────────────────── */

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
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('mouseenter', function() {
    const images = this.querySelectorAll('img');
    images.forEach(img => {
      img.style.transform = 'scale(1.02)';
      img.style.transition = 'transform 0.4s ease-out';
    });
  });
  
  project.addEventListener('mouseleave', function() {
    const images = this.querySelectorAll('img');
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

// 6. PARALLAX EFFECT ON SCROLL
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
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
  img.style.cursor = 'default';
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

console.log('✓ Portfolio interactions loaded');
