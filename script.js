/**
 * Ajmal Rahman Portfolio Script
 * Pure Vanilla JavaScript for premium animations and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Page Loader
  const pageLoader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('fade-out');
      // Trigger animations for elements in viewport right after load
      checkAnimations();
    }, 400); // Small delay to guarantee visual smooth transition
  });

  // 3. Theme Manager (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = themeToggleBtn.querySelector('.theme-icon-dark');
  const lightIcon = themeToggleBtn.querySelector('.theme-icon-light');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  });

  function updateThemeIcons(isDark) {
    if (isDark) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    } else {
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    }
  }

  // 4. Mobile Menu Toggling
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOpenIcon = mobileToggleBtn.querySelector('.menu-open-icon');
  const menuCloseIcon = mobileToggleBtn.querySelector('.menu-close-icon');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('mobile-open');
    if (isOpen) {
      menuOpenIcon.style.display = 'none';
      menuCloseIcon.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    } else {
      menuOpenIcon.style.display = 'block';
      menuCloseIcon.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      menuOpenIcon.style.display = 'block';
      menuCloseIcon.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  // Active Link Tracking on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. Scroll Progress and Floating elements
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    // Progress bar width
    scrollProgressBar.style.width = `${progress}%`;

    // Back to top visibility
    if (scrollTop > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }

    // Header scroll background modification
    if (scrollTop > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      header.style.height = '70px';
    } else {
      header.style.boxShadow = 'none';
      header.style.height = '80px';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. Interactive Canvas Background (Hero Section)
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const particles = [];
  const particleCount = 45;
  const connectionDistance = 120;
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 3 + 1.5;
    }

    update() {
      // Boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      // Adapt color variables for particles
      const themeColor = document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, ' : 'rgba(37, 99, 235, ';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = themeColor + '0.45)';
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw lines between nearby particles
    const themeColorLine = document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, ' : 'rgba(37, 99, 235, ';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < connectionDistance) {
          const opacity = (1 - (dist / connectionDistance)) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = themeColorLine + opacity + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // 7. Typist / Typewriter Effect
  const typewriter = document.getElementById('typewriter');
  const roles = [
    'Data Analyst',
    'SQL Developer',
    'Power BI Developer',
    'Python Enthusiast',
    'Business Intelligence Learner'
  ];
  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[currentRoleIdx];
    
    if (isDeleting) {
      // Remove character
      typewriter.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // Delete faster
    } else {
      // Add character
      typewriter.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120; // Normal typing speed
    }

    // Checking states
    if (!isDeleting && charIdx === currentRole.length) {
      // Completed typing, pause before deleting
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      // Completed deleting, move to next role
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typingSpeed = 400; // Small delay before typing next
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000); // Initial delay

  // 8. Intersection Observer for Scroll Entry Animations
  const animateElements = document.querySelectorAll('.fade-in-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger specific logic for child animations
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
        if (entry.target.id === 'achievements') {
          triggerCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function checkAnimations() {
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  checkAnimations();

  // Animate skill progress bars
  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
      const progress = bar.style.getPropertyValue('--progress') || '0%';
      bar.style.width = progress;
    });
  }

  // Animate counters when they come to view
  let countersStarted = false;
  function triggerCounters() {
    if (countersStarted) return;
    countersStarted = true;
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000; // 2 seconds
      const stepTime = Math.max(Math.floor(duration / target), 10);
      let current = 0;
      
      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, stepTime);
    });
  }

  // 9. Projects Search and Filter Engine
  const searchInput = document.getElementById('project-search');
  const filterButtons = document.querySelectorAll('.filter-badge');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsContainer = document.getElementById('projects-container');

  let activeFilter = 'all';
  let searchQuery = '';

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterProjects();
  });

  function filterProjects() {
    let visibleCount = 0;
    projectCards.forEach(card => {
      const tagsString = card.getAttribute('data-tags') || '';
      const tags = tagsString.split(' ');
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const desc = card.querySelector('.project-desc').textContent.toLowerCase();
      const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesSearch = searchQuery === '' || 
                            title.includes(searchQuery) || 
                            desc.includes(searchQuery) ||
                            techTags.some(tag => tag.includes(searchQuery));

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        // Re-trigger animate-in since it became visible
        setTimeout(() => {
          card.classList.add('animate-in');
        }, 50);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle "No results found" feedback
    const noResultsId = 'no-projects-feedback';
    let noResultsEl = document.getElementById(noResultsId);
    
    if (visibleCount === 0) {
      if (!noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.id = noResultsId;
        noResultsEl.className = 'text-center py-40 glass-card';
        noResultsEl.innerHTML = `
          <i data-lucide="folder-open" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <h3>No Projects Found</h3>
          <p style="color: var(--text-secondary); margin-top: 6px;">Try expanding your search query or choosing a different filter badge.</p>
        `;
        projectsContainer.appendChild(noResultsEl);
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    } else if (noResultsEl) {
      noResultsEl.remove();
    }
  }

  // 10. Dashboard Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxContainer = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = lightboxModal.querySelector('.lightbox-close');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      
      // Clone the visual element (the SVG inside the device screen)
      const screenElement = trigger.querySelector('.device-screen').children[0];
      const clonedElement = screenElement.cloneNode(true);
      
      lightboxContainer.innerHTML = '';
      lightboxContainer.appendChild(clonedElement);
      
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 11. Contact Form Validation and Custom Confetti
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('success-overlay');
  const successCloseBtn = document.getElementById('success-close');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset form validation states
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      const group = input.parentElement;
      if (input.required && !input.value.trim()) {
        group.classList.add('invalid');
        isValid = false;
      } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
        group.classList.add('invalid');
        isValid = false;
      } else {
        group.classList.remove('invalid');
      }
    });

    if (isValid) {
      // Simulate form submission success
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Sending...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      setTimeout(() => {
        // Success!
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        successOverlay.classList.add('active');
        triggerConfetti();
        contactForm.reset();
      }, 1500);
    }
  });

  successCloseBtn.addEventListener('click', () => {
    successOverlay.classList.remove('active');
  });

  // Helper validation
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  // Input listener to clear errors on typing
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.parentElement;
      group.classList.remove('invalid');
    });
  });

  // Custom Confetti Trigger
  function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    // Create temporary canvas overlaying the viewport
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.inset = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
    document.body.appendChild(confettiCanvas);
    
    const confettiCtx = confettiCanvas.getContext('2d');
    
    let cWidth = confettiCanvas.width = window.innerWidth;
    let cHeight = confettiCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      cWidth = confettiCanvas.width = window.innerWidth;
      cHeight = confettiCanvas.height = window.innerHeight;
    });

    const colors = ['#2563EB', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#EF4444'];
    const confettiParticles = [];

    class Confetti {
      constructor() {
        this.x = Math.random() * cWidth;
        this.y = Math.random() * -50 - 20;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 5 + 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        confettiCtx.restore();
      }
    }

    function runConfetti() {
      confettiCtx.clearRect(0, 0, cWidth, cHeight);
      
      if (Date.now() < animationEnd) {
        if (Math.random() < 0.3) {
          confettiParticles.push(new Confetti());
        }
        requestAnimationFrame(runConfetti);
      } else if (confettiParticles.length > 0) {
        requestAnimationFrame(runConfetti);
      } else {
        confettiCanvas.remove();
        return;
      }

      for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const p = confettiParticles[i];
        p.update();
        p.draw();
        
        // Remove particles below screen
        if (p.y > cHeight) {
          confettiParticles.splice(i, 1);
        }
      }
    }

    runConfetti();
  }

  // 12. Magnetic Buttons Effect
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull button slightly toward cursor
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Revert transformation smoothly
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  // 13. Custom Cursor Glow Follower
  const cursorGlow = document.getElementById('cursor-glow');
  
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    // Make glow expand when hovering over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .device-mockup, .skill-category-card, .cert-card, .soft-skill-badge');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('hovered');
      });
    });
  }

  // 14. Project Details Modal Controllers
  const detailsModal = document.getElementById('project-details-modal');
  const viewDetailsBtn = document.getElementById('view-details-btn');
  const viewSqlBtn = document.getElementById('view-sql-btn');
  const detailsCloseBtn = detailsModal.querySelector('.details-modal-close');

  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
      detailsModal.classList.add('active');
      detailsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (viewSqlBtn) {
    viewSqlBtn.addEventListener('click', () => {
      detailsModal.classList.add('active');
      detailsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Wait for transitions and scroll to SQL section
      setTimeout(() => {
        const sqlSection = document.getElementById('details-sql-section');
        if (sqlSection) {
          sqlSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    });
  }

  function closeDetailsModal() {
    detailsModal.classList.remove('active');
    detailsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (detailsCloseBtn) {
    detailsCloseBtn.addEventListener('click', closeDetailsModal);
  }

  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      closeDetailsModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailsModal.classList.contains('active')) {
      closeDetailsModal();
    }
  });
});

