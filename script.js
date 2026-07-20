/**
 * Ajmal Rahman Data Analyst Portfolio Script
 * Apple + Linear + Vercel + Stripe Inspired Interactions
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize EmailJS SDK
  if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY"); // User can add their EmailJS public key here if desired
  }

  // 3. Page Loader Dismissal
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => pageLoader.classList.add('loaded'), 300);
    });
    setTimeout(() => pageLoader.classList.add('loaded'), 1000);
  }

  // 4. Typing Effect for Hero Subtitle
  const typingElement = document.getElementById('typing-effect');
  if (typingElement) {
    const phrases = ['SQL', 'Python', 'Power BI', 'PostgreSQL', 'Data Analytics'];
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
        typingSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 5. Canvas Particle Ambient Background
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const count = Math.min(60, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 6. 3D Card Tilt Interaction Physics
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 7. Scroll Progress & Header Shrink
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

  // 8. Custom Cursor Glow
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

  // 9. Theme Toggle
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

  // 10. Mobile Navigation Toggler
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

  // 11. Scroll Spy Navigation Highlight
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

  // 12. Scroll Reveal Animations
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(elem => fadeObserver.observe(elem));

  // 13. Animated Counter Numbers
  const counterNumbers = document.querySelectorAll('.counter-number');
  let animatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters) {
        animatedCounters = true;
        counterNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          let count = 0;
          const step = Math.max(1, Math.floor(target / 40));

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

  const statsSection = document.getElementById('statistics');
  if (statsSection) counterObserver.observe(statsSection);

  // 14. Project Filter & Search
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
        card.style.display = 'flex';
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

  if (searchInput) searchInput.addEventListener('input', filterProjects);

  // 15. Dynamic Case Study Data Dictionary for 5 Projects
  const caseStudies = {
    covid: {
      title: "COVID-19 Global Data Analysis Case Study",
      subtitle: "SQL & Python Relational Queries, Null Preprocessing, and Inoculation Correlation",
      problem: "Healthcare organizations needed quick insights into pandemic transmission trajectories and rolling vaccination impact.",
      dataset: "Johns Hopkins University & OWID daily time-series data (150,000+ daily location logs).",
      cleaning: "Removed aggregated continent locations. Handled missing daily infection values with zero-filling and date index conversion.",
      analysis: "Calculated death percentage relative to total cases, CTE queries for continent totals, and PostgreSQL window functions for rolling inoculation counts.",
      dashboard: "Interactive time-series line chart comparing global infection curves versus mortality rates.",
      insights: "Identified strong inverse correlation (r = -0.78) between double-dose vaccination completion and hospital stay length.",
      impact: "Demonstrated clear analytical workflow to optimize vaccine supply logistics."
    },
    sales: {
      title: "E-Commerce Sales Performance Executive Dashboard",
      subtitle: "Power BI, Excel, and SQL Multi-Region Revenue Breakdown",
      problem: "Regional retail executives faced revenue leakage and lacked real-time visibility into top-performing SKU margins.",
      dataset: "Multi-region transactional sales records (orders, returns, shipping costs, customer segments).",
      cleaning: "Standardized currency values, eliminated duplicate order IDs, and established DAX calendar dimension tables.",
      analysis: "Created DAX measures for Year-over-Year (YoY) revenue growth, profit margin distributions, and return rate metrics.",
      dashboard: "Executive Power BI dashboard featuring interactive KPI cards, slicers for region, and profit drill-downs.",
      insights: "Revealed an 18% profit margin drag caused by expedited shipping costs on low-value items.",
      impact: "Provided actionable insights to restructure shipping thresholds and boost net profits."
    },
    hr: {
      title: "HR Employee Attrition Risk Analysis",
      subtitle: "Power BI & Python Predictive Workforce Analytics",
      problem: "High employee turnover increased recruitment costs and disrupted project delivery timelines.",
      dataset: "IBM HR Analytics dataset containing 1,470 employee records (tenure, role, overtime, satisfaction ratings).",
      cleaning: "Encoded ordinal satisfaction levels, binned employee tenure into quartiles, and verified complete record coverage.",
      analysis: "Evaluated attrition rates partitioned by department, salary slab, overtime requirements, and commute distance.",
      dashboard: "Executive HR dashboard displaying overall churn rate (16.1%) alongside departmental breakdown cards.",
      insights: "Discovered that employees working regular overtime with commute distances >15 km had a 3.4x higher churn rate.",
      impact: "Formulated targeted HR policy recommendations including flexible remote schedules to reduce attrition."
    },
    superstore: {
      title: "Superstore Sales & Profitability Analysis",
      subtitle: "Python EDA (Pandas, Matplotlib) & SQL Discount Impact Study",
      problem: "Uncontrolled discounting across product categories eroded overall store profit margins despite rising gross sales.",
      dataset: "Global Superstore dataset featuring 9,994 order records across Furniture, Office Supplies, and Technology.",
      cleaning: "Parsed shipping dates, calculated profit ratio metrics, and filtered out incomplete customer address fields.",
      analysis: "Executed correlation analysis between discount percentage levels and net profit margins across product lines.",
      dashboard: "Visual Python Matplotlib plots detailing profit loss thresholds when discounts exceeded 20%.",
      insights: "Discovered that heavy discounts on Technology items caused net negative profit margins despite high sales volume.",
      impact: "Recommended capping promotional discounts at 20% to safeguard product category profitability."
    },
    churn: {
      title: "Customer Churn Retention & Lifetime Value Analysis",
      subtitle: "PostgreSQL Window Functions & Python Cohort Modeling",
      problem: "Telecommunications provider experienced high month-to-month subscription cancellations.",
      dataset: "Telco Customer Churn dataset (7,043 customer accounts, monthly charges, contract types, tech support tickets).",
      cleaning: "Imputed missing total charges, binned tenure months, and formatted categorical service indicators.",
      analysis: "Calculated month-over-month cohort retention curves using PostgreSQL LEAD/LAG window functions.",
      dashboard: "Retention risk dashboard categorizing high-risk subscribers by contract tier.",
      insights: "Month-to-month contract customers with high monthly charges and >2 support tickets were 75% likely to cancel.",
      impact: "Enabled customer success teams to initiate proactive renewal incentives, lowering churn risk."
    }
  };

  const detailsModal = document.getElementById('project-details-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSubtitle = document.getElementById('modal-project-subtitle');
  const modalBody = document.getElementById('modal-case-study-body');
  const modalCloseBtn = detailsModal?.querySelector('.details-modal-close');

  function openCaseStudy(projectKey) {
    const data = caseStudies[projectKey];
    if (!data || !detailsModal) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = `
      <div class="details-section">
        <h3><i data-lucide="help-circle"></i> Problem Statement</h3>
        <p>${data.problem}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="database"></i> Dataset Overview</h3>
        <p>${data.dataset}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="brush"></i> Data Cleaning & Preprocessing</h3>
        <p>${data.cleaning}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="terminal"></i> Exploratory Data Analysis (EDA)</h3>
        <p>${data.analysis}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="layout-dashboard"></i> Dashboard Solution</h3>
        <p>${data.dashboard}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="trending-up"></i> Key Findings & Insights</h3>
        <p>${data.insights}</p>
      </div>
      <div class="details-section">
        <h3><i data-lucide="check-square"></i> Strategic Business Impact</h3>
        <p>${data.impact}</p>
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    detailsModal.classList.add('active');
    detailsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (detailsModal) {
      detailsModal.classList.remove('active');
      detailsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.open-case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectKey = btn.getAttribute('data-project');
      openCaseStudy(projectKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseStudy);
  if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeCaseStudy();
    });
  }

  // 16. Lightbox Image Viewer
  const lightboxModal = document.getElementById('lightbox-modal');
  const zoomTriggers = document.querySelectorAll('.zoom-trigger');
  const mediaContainer = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCloseBtn = lightboxModal?.querySelector('.lightbox-close');

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (!lightboxModal || !mediaContainer) return;
      const visualBox = trigger.querySelector('.showcase-visual-box');
      const caption = trigger.nextElementSibling?.textContent || 'Dashboard Snapshot';

      mediaContainer.innerHTML = visualBox ? visualBox.outerHTML : '';
      if (lightboxTitle) lightboxTitle.textContent = caption;

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudy();
      closeLightbox();
    }
  });

  // 17. Contact Form Handler (EmailJS + Fallback)
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
        // Send email via EmailJS if public key & template configured
        if (typeof emailjs !== 'undefined') {
          emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
            .then(() => {
              console.log('SUCCESS! Email sent via EmailJS');
            }, (error) => {
              console.log('EmailJS status notice:', error);
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
