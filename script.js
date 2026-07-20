/**
 * Ajmal Rahman Data Analyst Portfolio Script
 * Pure Vanilla JavaScript for FAANG & Big-4 grade interactive components.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Vector Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Page Loader Dismissal
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('loaded');
      }, 300);
    });
    // Fallback if load already fired
    setTimeout(() => {
      pageLoader.classList.add('loaded');
    }, 1200);
  }

  // 3. Scroll Progress Indicator & Header Scrolled State
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    // Scroll progress bar
    if (scrollProgress && totalScroll > 0) {
      const progressPercent = (currentScroll / totalScroll) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Header background blur on scroll
    if (header) {
      if (currentScroll > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (currentScroll > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Custom Cursor Ambient Glow Tracker
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 992) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursorGlow.style.left = `${cursorX}px`;
      cursorGlow.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover scale up on interactive elements
    const interactiveElems = document.querySelectorAll('a, button, .glass-card');
    interactiveElems.forEach(elem => {
      elem.addEventListener('mouseenter', () => cursorGlow.classList.add('hovered'));
      elem.addEventListener('mouseleave', () => cursorGlow.classList.remove('hovered'));
    });
  }

  // 5. Theme Toggle Handler
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.classList.add('light-theme');
    if (darkIcon && lightIcon) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      document.documentElement.classList.toggle('dark-theme', !isLight);
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

      if (darkIcon && lightIcon) {
        darkIcon.style.display = isLight ? 'none' : 'block';
        lightIcon.style.display = isLight ? 'block' : 'none';
      }
    });
  }

  // 6. Mobile Menu Navigation Toggler
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      mobileToggleBtn.setAttribute('aria-expanded', isActive);

      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.style.display = isActive ? 'none' : 'block';
        menuCloseIcon.style.display = isActive ? 'block' : 'none';
      }
    });

    // Auto-close menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.style.display = 'block';
          menuCloseIcon.style.display = 'none';
        }
      });
    });
  }

  // 7. Active Navigation Highlight & Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 8. Scroll Reveal Animations
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(elem => fadeObserver.observe(elem));

  // 9. Animated Counter Numbers for Milestones
  const counterNumbers = document.querySelectorAll('.counter-number');
  let animated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 1200; // ms
          const step = Math.max(1, Math.floor(target / (duration / 30)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = count;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) {
    counterObserver.observe(achievementsSection);
  }

  // 10. Project Category Filter & Search Functionality
  const filterBadges = document.querySelectorAll('.filter-badge');
  const searchInput = document.getElementById('project-search');
  const projectCards = document.querySelectorAll('.project-card');

  function filterProjects() {
    const activeFilter = document.querySelector('.filter-badge.active')?.getAttribute('data-filter') || 'all';
    const searchQuery = searchInput?.value.toLowerCase().trim() || '';

    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const text = card.textContent.toLowerCase();

      const matchesFilter = (activeFilter === 'all') || tags.includes(activeFilter);
      const matchesSearch = searchQuery === '' || text.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'grid';
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      filterBadges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  // 11. Project Details Case Study Modal Handler
  const detailsModal = document.getElementById('project-details-modal');
  const viewDetailsBtn = document.getElementById('view-details-btn');
  const viewSqlBtn = document.getElementById('view-sql-btn');
  const modalCloseBtn = detailsModal?.querySelector('.details-modal-close');

  function openDetailsModal(scrollToSql = false) {
    if (detailsModal) {
      detailsModal.classList.add('active');
      detailsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (scrollToSql) {
        setTimeout(() => {
          const sqlSection = document.getElementById('details-sql-section');
          sqlSection?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }

  function closeDetailsModal() {
    if (detailsModal) {
      detailsModal.classList.remove('active');
      detailsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', () => openDetailsModal(false));
  if (viewSqlBtn) viewSqlBtn.addEventListener('click', () => openDetailsModal(true));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDetailsModal);

  if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeDetailsModal();
    });
  }

  // 12. Lightbox Zoom Modal Handler for Showcase Cards
  const lightboxModal = document.getElementById('lightbox-modal');
  const zoomTriggers = document.querySelectorAll('.zoom-trigger');
  const mediaContainer = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = lightboxModal?.querySelector('.lightbox-close');

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (!lightboxModal || !mediaContainer) return;

      const visualBox = trigger.querySelector('.showcase-visual-box');
      const caption = trigger.nextElementSibling?.textContent || 'Visual Showcase';

      mediaContainer.innerHTML = visualBox ? visualBox.outerHTML : '';
      if (lightboxTitle) lightboxTitle.textContent = caption;
      if (lightboxDesc) lightboxDesc.textContent = 'High-resolution snapshot of analytical visualization script.';

      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailsModal();
      closeLightbox();
    }
  });

  // 13. Contact Form Validation & Success Overlay
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('success-overlay');
  const successCloseBtn = document.getElementById('success-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = contactForm.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          group?.classList.add('error');
          isValid = false;
        } else {
          group?.classList.remove('error');
        }
      });

      if (isValid && successOverlay) {
        successOverlay.classList.add('active');
        contactForm.reset();
      }
    });

    if (successCloseBtn && successOverlay) {
      successCloseBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
      });
    }
  }

});
