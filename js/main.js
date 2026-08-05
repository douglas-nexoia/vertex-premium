/* ============================================
   VERTEX — Main JavaScript
   Animations, Scroll Effects, Menu, Technical Hub, Form
   ============================================ */

(function () {
  'use strict';

  /* --- DOM References --- */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contact-form');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  /* ============================================
     NAVBAR SCROLL EFFECT
     ============================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ============================================
     MOBILE MENU
     ============================================ */
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileMenu.classList.contains('open')) closeMobileMenu();
      closeHubDrawer();
    }
  });

  /* ============================================
     SMOOTH SCROLL FOR NAVIGATION
     ============================================ */
  function handleSmoothScroll(e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      var target = document.getElementById(href.substring(1));
      if (target) {
        var navHeight = navbar.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  navbarLinks.forEach(function (link) {
    link.addEventListener('click', handleSmoothScroll);
  });

  var logoLink = document.querySelector('.navbar-logo');
  if (logoLink) {
    logoLink.addEventListener('click', handleSmoothScroll);
  }

  document.querySelectorAll('.footer-link').forEach(function (link) {
    link.addEventListener('click', handleSmoothScroll);
  });

  /* ============================================
     SCROLL REVEAL ANIMATIONS
     ============================================ */
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ============================================
     TECHNICAL HUB — TABS NAVIGATION
     ============================================ */
  var hubTabs = document.querySelectorAll('.hub-tab');
  var hubPanels = document.querySelectorAll('.hub-panel');

  hubTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetTab = this.getAttribute('data-tab');

      /* Update tab active states */
      hubTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      /* Update panel active states */
      hubPanels.forEach(function (panel) {
        panel.classList.remove('active');
        if (panel.getAttribute('id') === 'panel-' + targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* ============================================
     TECHNICAL HUB — DEEP DIVE MODAL DRAWER
     ============================================ */
  var hubCards = document.querySelectorAll('.hub-card');
  var hubDrawer = document.getElementById('hub-drawer');
  var drawerClose = document.getElementById('hub-drawer-close');
  var drawerTitle = document.getElementById('drawer-title');
  var drawerBadge = document.getElementById('drawer-badge');
  var drawerDesc = document.getElementById('drawer-desc');

  function openHubDrawer(card) {
    var title = card.getAttribute('data-deep-title') || '';
    var badge = card.getAttribute('data-deep-badge') || 'Detalhamento Técnico';
    var desc = card.getAttribute('data-deep-desc') || '';

    if (drawerTitle) drawerTitle.textContent = title;
    if (drawerBadge) drawerBadge.textContent = badge;
    if (drawerDesc) drawerDesc.textContent = desc;

    if (hubDrawer) hubDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeHubDrawer() {
    if (hubDrawer && hubDrawer.classList.contains('active')) {
      hubDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  hubCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openHubDrawer(this);
    });
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeHubDrawer();
    });
  }

  if (hubDrawer) {
    hubDrawer.addEventListener('click', function (e) {
      if (e.target === hubDrawer) {
        closeHubDrawer();
      }
    });
  }

  /* ============================================
     CONTACT FORM — WhatsApp Redirect
     ============================================ */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl = document.getElementById('form-name');
    var phoneEl = document.getElementById('form-phone');
    var brandEl = document.getElementById('form-brand');
    var messageEl = document.getElementById('form-message');

    var name = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var brand = brandEl.value;
    var message = messageEl.value.trim();

    if (!name || !phone || !brand) {
      if (!name) nameEl.style.borderColor = '#C9A869';
      if (!phone) phoneEl.style.borderColor = '#C9A869';
      if (!brand) brandEl.style.borderColor = '#C9A869';
      return;
    }

    var whatsappText = 'Olá, gostaria de solicitar um atendimento técnico especializado.\n\n';
    whatsappText += 'Nome: ' + name + '\n';
    whatsappText += 'Telefone: ' + phone + '\n';
    whatsappText += 'Marca do equipamento: ' + brand + '\n';
    if (message) {
      whatsappText += 'Mensagem: ' + message + '\n';
    }

    var whatsappUrl = 'https://wa.me/5541999999999?text=' + encodeURIComponent(whatsappText);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    contactForm.reset();
    nameEl.style.borderColor = '';
    phoneEl.style.borderColor = '';
    brandEl.style.borderColor = '';
  });

  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
    field.addEventListener('input', function () { this.style.borderColor = ''; });
    field.addEventListener('change', function () { this.style.borderColor = ''; });
  });

  /* Phone Mask */
  var phoneInput = document.getElementById('form-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var value = this.value.replace(/\D/g, '');
      if (value.length <= 2) {
        this.value = value.length > 0 ? '(' + value : '';
      } else if (value.length <= 7) {
        this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
      } else if (value.length <= 11) {
        this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
      } else {
        this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
      }
    });
  }

  /* Decorative Line Animation */
  var decoLines = document.querySelectorAll('.line-deco');
  var lineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = '60px';
        entry.target.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  decoLines.forEach(function (line) {
    line.style.width = '0';
    lineObserver.observe(line);
  });

})();
