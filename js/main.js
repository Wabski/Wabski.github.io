/* =====================================================================
   PORTFOLIO SCRIPTS
   ---------------------------------------------------------------------
   1. Theme toggle (light/dark, remembered between visits)
   2. Mobile menu
   3. Header border on scroll
   4. Scroll reveal animations (word-by-word headings, image wipes,
      staggered lists, timeline that fills as you scroll)
   5. Active nav link while scrolling
   6. Contact form (Formspree)
   7. Footer year
   No libraries required.
   ===================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. THEME TOGGLE ---------- */
  var themeToggle = document.querySelector('.theme-toggle');
  var themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
    // Keep the mobile browser bar in sync with the chosen theme
    themeColorMetas.forEach(function (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0B0B0F' : '#FAFAF7');
    });
  }

  applyTheme(root.getAttribute('data-theme') || 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- 2. MOBILE MENU ---------- */
  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navMenu.classList.toggle('is-open', open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link
    navMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close with Escape and return focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('is-open') && !e.target.closest('.site-header')) {
        setMenu(false);
      }
    });

    // Reset when resizing up to desktop
    window.matchMedia('(min-width: 820px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- 3. HEADER BORDER ON SCROLL ---------- */
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 4. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  // Stagger items that sit side by side in the same grid
  document.querySelectorAll('.skills, .projects, .hero__inner').forEach(function (group) {
    group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
      el.style.setProperty('--delay', (i * 0.08).toFixed(2) + 's');
    });
  });

  // Give list items an index (--i) so CSS can cascade them in one by one
  document.querySelectorAll('.facts, .chips').forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (el, i) {
      el.style.setProperty('--i', i);
    });
  });

  // Wrap each word of a heading in a mask so it can rise into view.
  // Screen readers get the original text through aria-label.
  function splitWords(heading) {
    var index = 0;
    heading.setAttribute('aria-label', heading.textContent.replace(/\s+/g, ' ').trim());

    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
          return;
        }
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;

        var fragment = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
            return;
          }
          var mask = document.createElement('span');
          var word = document.createElement('span');
          mask.className = 'split-word';
          mask.setAttribute('aria-hidden', 'true');
          word.textContent = part;
          word.style.setProperty('--i', index++);
          mask.appendChild(word);
          fragment.appendChild(mask);
        });
        node.replaceChild(fragment, child);
      });
    })(heading);
  }

  document.querySelectorAll('.hero__title, .section-title, .project__title').forEach(splitWords);

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // Timeline: the accent line fills as you scroll, and each dot lights up
  // when the line reaches it
  var timelines = document.querySelectorAll('.timeline');
  var timelineTicking = false;

  function updateTimelines() {
    timelineTicking = false;
    var trigger = window.innerHeight * 0.7;

    timelines.forEach(function (timeline) {
      var rect = timeline.getBoundingClientRect();
      var progress = prefersReducedMotion ? 1 : (trigger - rect.top) / rect.height;
      timeline.style.setProperty('--progress', Math.min(1, Math.max(0, progress)).toFixed(3));

      timeline.querySelectorAll('.timeline__item').forEach(function (item) {
        var reached = prefersReducedMotion || item.getBoundingClientRect().top + 12 < trigger;
        item.classList.toggle('is-reached', reached);
      });
    });
  }

  function requestTimelineUpdate() {
    if (!timelineTicking) {
      timelineTicking = true;
      window.requestAnimationFrame(updateTimelines);
    }
  }

  if (timelines.length) {
    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
    updateTimelines();
  }

  /* ---------- 5. ACTIVE NAV LINK ---------- */
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- 6. CONTACT FORM (FORMSPREE) ---------- */
  var form = document.querySelector('.contact-form');

  if (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(message, type) {
      status.textContent = message;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation with accessible error states
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var valid = field.checkValidity();
        field.setAttribute('aria-invalid', String(!valid));
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setStatus('Please fill in all fields with a valid email.', 'error');
        firstInvalid.focus();
        return;
      }

      // Reminder for you while setting up: the form ID hasn't been added yet
      if (form.action.indexOf('YOUR-FORM-ID') !== -1) {
        setStatus('Form not connected yet: add your Formspree form ID in index.html.', 'error');
        return;
      }

      submitBtn.disabled = true;
      setStatus('Sending…');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed');
          form.reset();
          form.querySelectorAll('[aria-invalid]').forEach(function (field) {
            field.removeAttribute('aria-invalid');
          });
          setStatus("Thanks! Your message has been sent. I'll get back to you soon.", 'success');
        })
        .catch(function () {
          setStatus('Something went wrong. Please email me directly instead.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });

    // Clear the error style as soon as the user fixes a field
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }

  /* ---------- 7. FOOTER YEAR ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
