/**
 * Ajmal Rahman Data Analyst Portfolio Script
 * Google-Inspired Modern Design & Interactions
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Vector Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize EmailJS SDK
  if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY");
  }

  // 3. Page Loader Dismissal
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => pageLoader.classList.add('loaded'), 300);
    });
    setTimeout(() => pageLoader.classList.add('loaded'), 800);
  }

  // 4. Hero Section Typing Animation
  const typingElement = document.getElementById('typing-effect');
  if (typingElement) {
    const phrases = ['Python', 'SQL', 'Excel', 'Power BI', 'Pandas', 'NumPy', 'Data Visualization'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 5. 3D Card Tilt Interaction Physics
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 6. Scroll Progress & Header Shrink
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if (scrollProgress && totalScroll > 0) {
      scrollProgress.style.width = `${(currentScroll / totalScroll) * 100}%`;
    }

    if (header) {
      header.classList.toggle('scrolled', currentScroll > 40);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', currentScroll > 300);
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Custom Cursor Glow Tracker
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 992) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

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
  }

  // 8. Theme Toggle (Light Default -> Dark Toggle)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark-theme');
    if (darkIcon && lightIcon) {
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      document.documentElement.classList.toggle('light-theme', !isDark);
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

      if (darkIcon && lightIcon) {
        darkIcon.style.display = isDark ? 'block' : 'none';
        lightIcon.style.display = isDark ? 'none' : 'block';
      }
    });
  }

  // 9. Mobile Navigation Toggler
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

    document.querySelectorAll('.nav-link').forEach(link => {
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

  // 10. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  // 11. Scroll Reveal Animations
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(elem => fadeObserver.observe(elem));

  // 12. Animated Counter Numbers
  const counterNumbers = document.querySelectorAll('.counter-number');
  let animatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters) {
        animatedCounters = true;
        counterNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          let count = 0;
          const timer = setInterval(() => {
            count += 1;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = count;
            }
          }, 100);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('statistics');
  if (statsSection) counterObserver.observe(statsSection);

  // 13. Contact Form Handler (EmailJS + Validation)
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

      if (isValid) {
        if (typeof emailjs !== 'undefined') {
          emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
            .then(() => {
              console.log('SUCCESS! Message sent via EmailJS');
            }, (err) => {
              console.log('EmailJS status notice:', err);
            });
        }

        if (successOverlay) {
          successOverlay.classList.add('active');
        }
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
